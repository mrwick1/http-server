import { getLogs } from "../controllers/log-controllers";
import { createAPI } from "../utils/createAPI";

export const logRoutes = [createAPI("get", "/logs", getLogs)];
