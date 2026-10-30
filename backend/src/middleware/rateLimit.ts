import rateLimit from "express-rate-limit";

/**
 * Contact form rate limiter.
 * 5 requests per IP per hour.
 */
export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many submissions from this IP. Please try again later.",
  },
});

/**
 * Auth login rate limiter — 10 attempts per IP per 15 min.
 */
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
});
