# VXID — Digital Empires

A premium dark-luxury digital agency website. Full-stack: Next.js 14 (App Router) + TypeScript frontend, Express + Prisma + PostgreSQL backend, deployed to Railway.

> "Silence over noise. Space over clutter."

---

## ✨ Features

- **Custom gold cursor** with mix-blend-mode difference, hover scaling, click burst
- **Lenis smooth scroll** (easeInOutQuart, 1.2s) across the entire site
- **Word-by-word hero reveal** on load (staggered 80ms)
- **Scroll reveal** on every section (threshold 0.15, once)
- **Magnetic buttons** (60px radius, lerp return)
- **3D tilt cards** (max 8°, perspective 1000px, spring return)
- **Page transitions** via Framer Motion AnimatePresence
- **Parallax** hero mesh + portfolio images
- **Animated number counters** (2000ms ease-out)
- **Infinite marquee** tech ticker (pauses on hover)
- **Mouse-wheel horizontal scroll** portfolio
- **Film grain texture** overlay on the whole site
- **Mobile-first responsive** (375 / 768 / 1280 / 1920)
- **Working contact form** → PostgreSQL + email notification
- **JWT admin auth** with bcrypt-hashed password
- **Admin dashboard**: stats, table, expandable rows, search, pagination, mark-read/delete
- **Rate-limited** contact form (5/IP/hour)
- **Helmet security headers**, locked CORS in production

---

## 🧱 Tech Stack

### Frontend
- Next.js 14.2.x (App Router, TypeScript strict)
- Tailwind CSS 3.4.x
- Framer Motion 11.x, GSAP 3.12.x
- Lenis (@studio-freight/lenis) 1.0.x
- lucide-react, clsx, tailwind-merge

### Backend
- Express 4.x, TypeScript 5.x
- Prisma 5.x, PostgreSQL 15
- jsonwebtoken 9.x, bcryptjs 2.x
- nodemailer 6.x, cors, helmet, express-rate-limit, zod

---

## 📁 Structure

```
vxid/
├── frontend/          # Next.js app
├── backend/           # Express + Prisma API
├── railway.toml       # Railway multi-service config
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL (local or via Docker)

### 1. Backend

```bash
cd backend
cp .env.example .env          # then fill in values
npm install                   # installs deps + generates Prisma client
npx prisma migrate dev        # creates tables locally
npm run seed                  # creates admin user (bcrypt-hashed)
npm run dev                   # starts on http://localhost:8080
```

Backend `.env` (local):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vxid?schema=public"
PORT=8080
NODE_ENV=development
JWT_SECRET="your-64-char-random-string"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@vxid.studio
FRONTEND_URL=http://localhost:3000
ADMIN_SEED_EMAIL=admin@vxid.studio
ADMIN_SEED_PASSWORD=change-this-password
```

Generate a JWT secret: `openssl rand -base64 48`

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local    # set NEXT_PUBLIC_API_URL=http://localhost:8080
npm install
npm run dev                   # starts on http://localhost:3000
```

Open http://localhost:3000 for the site, http://localhost:3000/admin/login to log in.

**Default admin** (from seed): `admin@vxid.studio` / whatever you set `ADMIN_SEED_PASSWORD` to.

---

## ☁️ Railway Deployment (Step by Step)

### Step 1 — Create the Railway project
1. Go to [railway.com](https://railway.com) and log in.
2. Click **New Project** → **Start from scratch** (empty).
3. Name it `vxid` and create.

### Step 2 — Add PostgreSQL
1. In the Railway project, click **Add** → **PostgreSQL**.
2. Pick any plan (the free egress/hobby tier works for development).
3. A `DATABASE_URL` is auto-generated. **Copy it** — you'll paste it into the backend service variables.

### Step 3 — Add the Backend service
1. Click **New Service** → **Backend**.
2. **Source:** upload the `vxid` repo (or connect GitHub and pick the repo).
3. **Source path:** `backend`
4. **Build command:** `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
5. **Start command:** `npm run start`
6. **Health check path:** `/api/health`
7. Click **Deploy**. Wait for the build to finish.

### Step 4 — Configure Backend variables
In the backend service → **Settings** → **Variables**, add:

```
DATABASE_URL    = <paste from Step 2>
JWT_SECRET      = <openssl rand -base64 48>
SMTP_HOST       = smtp.gmail.com
SMTP_PORT       = 587
SMTP_USER       = <your Gmail address>
SMTP_PASS       = <your Gmail App Password — NOT your regular password>
ADMIN_EMAIL     = admin@vxid.studio
PORT            = 8080
NODE_ENV        = production
FRONTEND_URL    = https://<your-frontend-service>.railway.app  (fill after Step 6)
ADMIN_SEED_EMAIL = admin@vxid.studio
ADMIN_SEED_PASSWORD = <choose a strong password>
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords → generate. Use that 16-char code as `SMTP_PASS`.

### Step 5 — Seed the admin user
Run a one-off script in the backend service:
1. Railway → backend service → **Terminal** (or **Run Command**).
2. Execute: `npm run seed`
3. This creates/updates the admin with a bcrypt-hashed password.

You now have a working API. Note the backend URL: `https://<backend-service-name>.railway.app`.

### Step 6 — Add the Frontend service
1. Click **New Service** → **Node** (or Frontend).
2. **Source:** same repo, **Source path:** `frontend`
3. **Build command:** `npm install && npm run build`
4. **Start command:** `npm run start`
5. **Health check path:** `/`
6. Deploy. Note the frontend URL: `https://<frontend-service-name>.railway.app`.

### Step 7 — Configure Frontend variables
In the frontend service → **Settings** → **Variables**, add:

```
NEXT_PUBLIC_API_URL = https://<your-backend-service-name>.railway.app
```

### Step 8 — Reconcile CORS
Set the backend's `FRONTEND_URL` to the frontend's actual URL (from Step 6), then redeploy the backend so CORS locks to that origin.

### Step 9 — Verify
- Frontend: `https://<frontend>.railway.app`
- Backend health: `https://<backend>.railway.app/api/health`
- Admin: `https://<frontend>.railway.app/admin/login`
- Submit the contact form → check the admin dashboard → email notification arrives.

---

## 🔌 API Reference

| Method | Endpoint                          | Auth   | Description                  |
|--------|----------------------------------|--------|------------------------------|
| POST   | `/api/contact`                   | Public | Save submission + email      |
| POST   | `/api/auth/login`                | Public | Returns JWT                  |
| GET    | `/api/admin/submissions`         | JWT    | List (page, limit, search)   |
| GET    | `/api/admin/stats`               | JWT    | Dashboard stats              |
| GET    | `/api/admin/submissions/:id`     | JWT    | Single submission            |
| PATCH  | `/api/admin/submissions/:id/read`| JWT    | Mark as read                 |
| DELETE | `/api/admin/submissions/:id`     | JWT    | Delete submission            |
| GET    | `/api/health`                    | Public | Railway health check         |

---

## 🗃️ Prisma

Schema lives at `backend/src/prisma/schema.prisma`. The initial migration is at `backend/src/prisma/migrations/0_init/`.

- Local dev: `npx prisma migrate dev`
- Production deploy: `npx prisma migrate deploy` (used in the Railway build command)

---

## 🎨 Visual Identity

| Token    | Value      | Usage                |
|----------|------------|----------------------|
| void     | `#050505`  | Background           |
| surface  | `#0F0F0F`  | Bands / surfaces     |
| card     | `#141414`  | Cards                |
| gold     | `#C9A84C`  | Primary accent       |
| white    | `#F5F5F5`  | Primary text         |
| muted    | `#666666`  | Secondary text       |
| border   | `#1F1F1F`  | Borders              |

Fonts: **Clash Display** (display, Fontshare), **Inter** (body, Google Fonts), **JetBrains Mono** (labels, Google Fonts).

---

## 📄 License

Proprietary — VXID. All rights reserved.
