import { Request, Response } from "../types/types";
import { sendResponse } from "../utils/utils";

export const signup = async (req: Request, res: Response) => {
  sendResponse(200, res, "success");
};
