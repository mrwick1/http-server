import { createModel } from "../orm/define-model";

const userColumns = {
  id: "SERIAL PRIMARY KEY",
  username: "VARCHAR(100)",
  password: "VARCHAR(100)",
};

export const User = createModel("users", userColumns);
