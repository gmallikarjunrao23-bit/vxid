import { Router } from "express";
import { handleContact } from "../controllers/contactController";
import { contactRateLimit } from "../middleware/rateLimit";

const router = Router();

router.post("/", contactRateLimit, handleContact);

export default router;
