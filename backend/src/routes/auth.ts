import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { loginRateLimit } from "../middleware/rateLimit";

const router = Router();

router.post("/login", loginRateLimit, handleLogin);

export default router;
