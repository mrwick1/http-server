import { Response } from "../types/types";
import { createLog } from "./logger";

export const sendResponse = async (
  status: number,
  res: Response,
  data?: any,
  err?: string
): Promise<void> => {
  try {
    res.writeHead(status, { "Content-Type": "application/json" });

    if (err) {
      createLog(res.req, res, err);
    } else {
      createLog(res.req, res, "Request logged");
    }
    res.end(JSON.stringify({ data, err }));
  } catch (error) {
    console.error("Error sending response:", error);
  }
};
