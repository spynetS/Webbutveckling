import express, { Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routes/api";

import { init } from "./database/database";

import session from "express-session";
import MongoStore from "connect-mongo";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// init the database
init(process.env.DATABASE_URI!);

// Middleware
// TODO make a .env file for the secret
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URI!, // your MongoDB connection
      ttl: 14 * 24 * 60 * 60, // session expiration in seconds (14 days)
    }),
    cookie: {
      secure: false, // true if using HTTPS
      httpOnly: true,
      sameSite: "lax",
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
