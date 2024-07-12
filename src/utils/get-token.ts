import { Request } from "../types/types";
import { verifyToken } from "./token";

export const getToken = (req: Request) => {
  const token = req.headers.authorization;
  if (!token) {
    return null;
  }
  const tokenParts = token.split(" ");
  if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
    return null;
  }
  return verifyToken(tokenParts[1]);
};
