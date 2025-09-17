import { Router, Request, Response, NextFunction } from "express";
import ApiResponse from "../database/response";
import ExerciseTemplate from "../models/ExerciseTemplate"
import { getExercise, create,deleteExercise } from "../controllers/exerciseTemplateController";

const router = Router();

router.get("/",getExercise)
router.post("/",create);
router.delete("/",deleteExercise);

export default router;
