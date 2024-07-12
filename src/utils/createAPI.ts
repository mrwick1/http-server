import { Request, Response } from "../types/types";

export const createAPI = (
  method: "get" | "post" | "put" | "delete",
  path: string,
  handler: (req: Request, res: Response) => void
) => {
  return { method, path, handler };
};
