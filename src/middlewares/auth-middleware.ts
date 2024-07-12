import { Request, Response } from "../types/types";
import { getToken } from "../utils/get-token";
import { sendResponse } from "../utils/send-response";

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    if (isPublicRoute(req.url)) {
      // If it's a public route, continue without authentication check
      next();
    }
    const token = getToken(req);
    if (!token) {
      sendResponse(401, res, { message: "Unauthorized" });
      return;
    }
    req.userId = token.userId;
    next();
  } catch (error) {
    console.error("Error in authMiddleWare:", error);
    sendResponse(500, res, { message: "Internal Server Error" });
  }
};

const isPublicRoute = (url?: string) => {
  if (!url) {
    return false;
  }
  const publicRoutes = ["/signin", "/signup"];
  return publicRoutes.includes(url);
};
