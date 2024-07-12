import { Request, Response } from "../types/types";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  // Set CORS headers to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  req.startTime = Date.now();
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Pass control to the next middleware or route handler
  next();
};
