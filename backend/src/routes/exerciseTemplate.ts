import { Router } from "express";
import { getExercise, create,deleteExercise, stats } from "../controllers/exerciseTemplateController";

const router = Router();

router.get("/",getExercise)
router.post("/",create);
router.delete("/",deleteExercise);

router.post("/stats",stats);

export default router;
