import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello to the page in typescript</h1>");
});

app.listen("3000", () => {
  console.log("server Running on port 3000");
});
