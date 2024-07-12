import { Request, Response } from "../types/types";

// Custom sanitization function to escape potentially harmful characters
const sanitize = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Middleware function to sanitize user inputs
export const customSanitizer = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  if (req.body) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = sanitize(req.body[key].toString());
      }
    }
  }
  next();
};
