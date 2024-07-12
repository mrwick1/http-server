import { Request, Response } from "../types/types";

export const bodyParser = (req: Request, res: Response, next: () => void) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const jsonData = JSON.parse(data);
      req.body = jsonData;
      next();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};
