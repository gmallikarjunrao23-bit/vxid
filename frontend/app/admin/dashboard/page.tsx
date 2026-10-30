"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Loader2,
  LogOut,
  Search,
  Trash2,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import {
  clearToken,
  deleteSubmission,
  fetchStats,
  fetchSubmissions,
  hasToken,
  markRead,
  type AdminStats,
  type Submission,
} from "@/lib/api";
import { cn, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  const [stats, setStats] = useState<AdminStats>({ total: 0, unread: 0, thisMonth: 0 });
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!hasToken()) {
      router.replace("/admin/login");
      return;
    }
    setAuthed(true);
    setChecking(false);
  }, [router]);

  const loadData = useCallback(
    async (pageNum: number, searchTerm: string) => {
      setLoading(true);
      try {
        const [subs, statsData] = await Promise.all([
          fetchSubmissions({ page: pageNum, limit: 10, search: searchTerm }),
          fetchStats(),
        ]);
        setSubmissions(subs.data);
        setTotal(subs.total);
        setPage(subs.page);
        setTotalPages(subs.totalPages);
        setStats(statsData);
      } catch (err) {
        // Auth failure → redirect to login
        console.error(err);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (authed) {
      loadData(1, "");
    }
  }, [authed, loadData]);

  const handleSearch = () => {
    setPage(1);
    loadData(1, searchInput);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteSubmission(id);
      const remaining = submissions.length - 1;
      const newTotalPages = Math.max(1, Math.ceil((total - 1) / 10));
      const targetPage = remaining === 0 && page > 1 ? page - 1 : page;
      await loadData(targetPage, searchInput);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const updated = await markRead(id);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
      setStats((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.replace("/admin/login");
  };

  const handleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    const sub = submissions.find((s) => s.id === id);
    if (sub && !sub.isRead) {
      handleMarkRead(id);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (!authed) return null;

  const startIndex = total === 0 ? 0 : (page - 1) * 10 + 1;
  const endIndex = Math.min(page * 10, total);

  return (
    <div className="min-h-screen bg-void px-6 py-10 lg:px-10">
      {/* Header */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="display text-2xl font-bold">
              <span className="text-gold">VXID</span>
            </Link>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Admin Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Submissions" value={stats.total} />
          <StatCard label="Unread" value={stats.unread} accent />
          <StatCard label="This Month" value={stats.thisMonth} />
        </div>

        {/* Search */}
        <div className="mt-8 flex gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name or email..."
              className="vxid-input pl-10"
            />
          </div>
          <button
            onClick={handleSearch}
            className="rounded-lg bg-gold px-6 py-3 font-semibold text-void transition-colors hover:bg-white"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wider text-muted">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Type</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center">
                    <Loader2 className="mx-auto animate-spin text-gold" size={24} />
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-muted">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <Fragment key={sub.id}>
                    <tr
                      onClick={() => handleExpand(sub.id)}
                      className={cn(
                        "cursor-pointer border-b border-border transition-colors hover:bg-surface",
                        expandedId === sub.id && "bg-surface"
                      )}
                    >
                      <td className="p-4 font-medium text-white">{sub.name}</td>
                      <td className="p-4 text-sm text-white/70">{sub.email}</td>
                      <td className="p-4 text-sm text-white/70">{sub.budget}</td>
                      <td className="p-4 text-sm text-white/70">{sub.projectType}</td>
                      <td className="p-4 text-sm text-muted">
                        {sub.message.slice(0, 60)}
                        {sub.message.length > 60 ? "..." : ""}
                      </td>
                      <td className="p-4 text-sm text-white/70">
                        {formatDate(sub.createdAt)}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs",
                            sub.isRead
                              ? "bg-border text-muted"
                              : "bg-gold/15 text-gold"
                          )}
                        >
                          {sub.isRead ? "read" : "unread"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkRead(sub.id);
                            }}
                            className="rounded-md p-2 text-muted transition-colors hover:bg-border hover:text-gold"
                            aria-label="Mark as read"
                          >
                            <CheckCheck size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(sub.id);
                            }}
                            disabled={deletingId === sub.id}
                            className="rounded-md p-2 text-muted transition-colors hover:bg-border hover:text-red-400 disabled:opacity-50"
                            aria-label="Delete submission"
                          >
                            {deletingId === sub.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedId === sub.id && (
                        <motion.tr
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-b border-border bg-surface"
                        >
                          <td colSpan={8} className="p-6">
                            <div className="ml-4 rounded-lg border border-border bg-card p-5">
                              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                                {sub.message}
                              </p>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted">
              Showing {startIndex}–{endIndex} of {total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => loadData(page - 1, searchInput)}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => loadData(p, searchInput)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm transition-colors",
                    p === page
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted hover:border-gold hover:text-white"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => loadData(page + 1, searchInput)}
                disabled={page === totalPages}
                className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="text-sm uppercase tracking-wider text-muted">{label}</div>
      <div
        className={cn(
          "display mt-2 text-4xl font-bold",
          accent ? "text-gold" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  );
}
