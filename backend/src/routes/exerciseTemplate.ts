import { Router } from "express";
import { getExercise, create,deleteExercise } from "../controllers/exerciseTemplateController";

const router = Router();

router.get("/",getExercise)
router.post("/",create);
router.delete("/",deleteExercise);

export default router;
