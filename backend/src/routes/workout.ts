import { Router } from "express";
import {
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController";

const router = Router();

router.get("/", getWorkout);
router.post("/", createWorkout);
router.delete("/", deleteWorkout);
router.put("/:id", updateWorkout);

export default router;
