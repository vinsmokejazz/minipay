import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";

export const zodMiddleware = (schema: ZodSchema<any>): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map((i) => ({ field: i.path.join("."), message: i.message }));
        res.status(400).json({ success: false, message: "Validation failed", errors: issues });
        return;
      }
      next(err);
    }
  };
};