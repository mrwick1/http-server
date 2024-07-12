import { getCurrentUser, signIn, signup } from "../controllers/auth";
import { createAPI } from "../utils/createAPI";

export const authRoutes = [
  createAPI("post", "/signup", signup),
  createAPI("post", "/signIn", signIn),
  createAPI("get", "/current-user", getCurrentUser),
];
