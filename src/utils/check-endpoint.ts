import { Request } from "../types/types";

export const checkEndPoint = (
  method: "get" | "post" | "put" | "delete",
  path: string,
  req: Request
): boolean => {
  if (!req.method) {
    return false;
  }
  return req.method.toLowerCase() === method.toLowerCase() && req.url === path;
};
