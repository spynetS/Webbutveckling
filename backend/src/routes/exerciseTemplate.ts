import { Router } from "express";

import { getExercise, create,deleteExercise, setImage, stats } from "../controllers/exerciseTemplateController";

const router = Router();

router.get("/",getExercise)
router.post("/",create);
router.delete("/",deleteExercise);
router.put("/set-image",setImage);

router.post("/stats",stats);

export default router;
