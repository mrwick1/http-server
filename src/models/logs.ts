import { createModel } from "../orm/define-model";

const logColumns = {
  id: "SERIAL PRIMARY KEY",
  message: "TEXT",
  timestamp: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  method: "VARCHAR(10)",
  url: "TEXT",
  headers: "JSONB",
  query: "JSONB",
  body: "JSONB",
  statusCode: "INTEGER",
  responseTime: "INTEGER",
  clientIp: "VARCHAR(45)",
  userId: "VARCHAR(255)",
  error: "TEXT",
};

export const Log = createModel("logs", logColumns);
