import express, { Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routes/api";

import { init } from "./database/database";
import session from "express-session";

const app = express();
const port = 3000;

// init the database
init();

// Middleware
// TODO make a .env file for the secret
app.use(
  session({
    secret: "your-secret-key", // change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if using HTTPS
      httpOnly: true, // keeps it safer from JS access
      sameSite: "lax", // allow cross-site cookies
    },
  }),
);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.170:38045",
    ], // allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies
  }),
);

// Routes
app.use("/api", apiRouter);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript REST API is running 🚀" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
