import http from "http";

export type Request = http.IncomingMessage & {
  body?: any;
  query?: any;
  userId?: string;
  error?: string;
  startTime?: number;
};
export type Response = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};
