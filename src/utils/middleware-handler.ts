import { Request, Response } from "../types/types";

type Middleware = (req: Request, res: Response, next: () => void) => void;
type RouteHandler = (req: Request, res: Response) => void;

interface Route {
  method: "get" | "post" | "put" | "delete";
  path: string;
  handler: RouteHandler;
}

export const runMiddlewares = (
  req: Request,
  res: Response,
  middlewares: Middleware[],
  routes: Route[]
) => {
  const run = (index: number) => {
    if (index < middlewares.length) {
      middlewares[index](req, res, () => run(index + 1));
    } else {
      handleRoute(req, res, routes);
    }
  };
  run(0);
};

const handleRoute = (req: Request, res: Response, routes: Route[]) => {
  const matchingRoute = routes.find(
    (route) =>
      route.method === req.method?.toLowerCase() &&
      route.path.toLowerCase() === req?.url?.toLowerCase()
  );
  if (matchingRoute) {
    matchingRoute.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};
