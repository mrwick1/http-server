import { Log } from "../models/logs";
import { User } from "../models/user";

try {
  User.define();
  Log.define();
  console.log("Tables created successfully");
} catch (error) {
  console.log(error);
}
