import { Log } from "../models/logs";
import { Request, Response } from "../types/types";
import { sendResponse } from "../utils/send-response";

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await Log.findAll();
    sendResponse(200, res, logs);
  } catch (error) {
    console.error(error);
    sendResponse(500, res, { message: "Internal Server Error" });
  }
};
