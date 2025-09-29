import { Router } from "express";
import { getWorkout, createWorkout, deleteWorkout } from "../controllers/workoutController";

const router = Router();

router.get("/",getWorkout)
router.post("/",createWorkout)
router.delete("/",deleteWorkout)

export default router;
