import { RequestListener } from "http";
import { Request, Response } from "../types/types";

export const sendResponse = async (
  status: number,
  res: Response,
  data?: any,
  err?: string
): Promise<void> => {
  try {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data, err }));
  } catch (error) {
    console.log(error);
  }
};
export const checkEndPoint = async (
  method: "get" | "post" | "put" | "delete",
  path: string,
  req: Request
): Promise<boolean> => {
  return (
    (req.method &&
      req.method.toLowerCase() === method.toLowerCase() &&
      path === req.url) ||
    false
  );
};

export const createAPI = async (
  method: "get" | "post" | "put" | "delete",
  path: string,
  callBack: (req: Request, res: Response) => void,
  req: Request,
  res: Response
) => {
  if (await checkEndPoint(method, path, req)) {
    callBack(req, res);
  } else {
    sendResponse(405, res, { message: "Method Not Allowed" });
  }
};
