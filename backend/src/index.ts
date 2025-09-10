import express, { Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routes/api";

import {init} from './database/database'

const app = express();
const port = 3000;

// init the database
init();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRouter);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript REST API is running 🚀" });
});

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
});
