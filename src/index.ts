import http from "http";
import { bodyParser } from "./middlewares/body-parser";
import { runMiddlewares } from "./utils/middleware-handler";
import { authRoutes } from "./routes/authRoutes";
import { corsMiddleware } from "./middlewares/cors";
import { customSanitizer } from "./middlewares/sanitizer";
import { authMiddleWare } from "./middlewares/auth-middleware";
import { logRoutes } from "./routes/logs";

const port = 3000;

const middlewares = [
  corsMiddleware,
  bodyParser,
  authMiddleWare,
  customSanitizer,
];

const routes = [...authRoutes, ...logRoutes];

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, middlewares, routes);
});

server.listen(port, () => {
  console.log(`Server running successfully at http://localhost:${port}`);
});
