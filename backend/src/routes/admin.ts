import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  deleteSubmission,
  getStats,
  getSubmission,
  listSubmissions,
  markAsRead,
} from "../controllers/adminController";

const router = Router();

// All admin routes require a valid JWT
router.use(requireAuth);

router.get("/submissions", listSubmissions);
router.get("/stats", getStats);
router.get("/submissions/:id", getSubmission);
router.patch("/submissions/:id/read", markAsRead);
router.delete("/submissions/:id", deleteSubmission);

export default router;
