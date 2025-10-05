import { Router, Request, Response, NextFunction } from "express";
import User from "../models/User";
import ApiResponse from "../database/response";
import {
  userCreate,
  userLogin,
  logWeight,
} from "../controllers/userController";

import { getStats } from "../controllers/statController";
import {
  setWeightGoal,
  getWeightGoalProgress,
} from "../controllers/weightcontroller";

import exerciseRouter from "./exerciseTemplate";
import setRouter from "./set";
import workoutRouter from "./workout";

const router = Router();

// Middleware to disable caching
router.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store"); // disable caching for all routes
  next();
});

router.get("/test", (req: Request, res: Response) => {
  const name = req.query.name;
  if (!name) {
    res.json(
      new ApiResponse({
        status: "fail",
        data: "You must proivide name and email!",
      }),
    );
  }

  User.create([{ name: req.body.userName, email: name + "@asd.com" }])
    .then(() => {
      res.json(new ApiResponse({ data: "added" }));
    })
    .catch((error: Error) => {
      res.json(new ApiResponse({ status: "fail", data: error.message }));
    });
});

router.get("/get-user", (req: Request, res: Response) => {
  try {
    console.log(req.session.userId);

    User.findById(req.session.userId).then((users) => {
      res.json(new ApiResponse({ data: users }));
    });
  } catch (err: Error) {
    res.status(500).json(new ApiResponse({ status: "error", message: err }));
  }
});

router.get("/get-user/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  User.find({ name })
    .then((users) => {
      res.json(new ApiResponse({ data: users }));
    })
    .catch((error: Error) => {
      res.json(new ApiResponse({ status: "fail", data: error }));
    });
});

//stats
router.get("/stats", getStats);

router.post("/signup", userCreate);
router.post("/login", userLogin);
router.post("/log-weight", logWeight);
router.post("/set-weight-goal", setWeightGoal);
router.get("/weight-goal-progress", getWeightGoalProgress);

// register the api routes
router.use("/exercise", exerciseRouter);
router.use("/set", setRouter);
router.use("/workout", workoutRouter);

export default router;
