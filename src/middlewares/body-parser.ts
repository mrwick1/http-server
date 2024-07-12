import { Request, Response } from "../types/types";

export const bodyParser = (
  req: Request,
  res: Response,
  onComplete: () => void
) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      if (data === "") {
        onComplete();
        return;
      }
      // Parse JSON data
      const jsonData = JSON.parse(data ?? "{}");
      req.body = jsonData;

      // Call onComplete callback to indicate parsing is complete
      onComplete();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};
