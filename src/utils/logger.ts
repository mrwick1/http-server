import { Log } from "../models/logs";
import { Request, Response } from "./../types/types";

export const createLog = (req: Request, res: Response, message?: string) => {
  res.on("finish", () => {
    const log = {
      message: "Request logged",
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body,
      statusCode: res.statusCode,
      responseTime: req?.startTime ? Date.now() - req?.startTime : 0,
      clientIp: req.socket.remoteAddress,
      userId: req.userId,
      error: req.error,
    };
    const logTemplate = `
      Message: ${message}
      Method: ${req.method}
      URL: ${req.url}
      Body: ${JSON.stringify(req.body)}
      Status Code: ${res.statusCode}
      Response Time: ${req?.startTime ? Date.now() - req?.startTime : 0}`;
    console.log(logTemplate);
    Log.create(log);
  });
};
