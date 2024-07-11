import http from "http";
import { createAPI } from "./utils/utils";
import { signup } from "./controllers/sign-up";

// specify the port
const port = 3000;

// create a server
const server = http.createServer(async (req, res) => {
  // create a test api
  createAPI("post", "/test", signup, req, res);
});

// listen to a port
server.listen(port, () => {
  console.log(`Server running successfully at http://localhost:${port}`);
});
