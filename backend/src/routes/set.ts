import { Router } from "express";
import ApiResponse from "../database/response";
import { getSet, createSet, deleteSet } from "../controllers/setController";

const router = Router();

router.get("/",getSet)
router.post("/",createSet)
router.delete("/",deleteSet)

export default router;
