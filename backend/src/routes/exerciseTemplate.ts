import { Router } from "express";
import { getExercise, create,deleteExercise, setImage } from "../controllers/exerciseTemplateController";

const router = Router();

router.get("/",getExercise)
router.post("/",create);
router.delete("/",deleteExercise);
router.put("/set-image",setImage);

export default router;
