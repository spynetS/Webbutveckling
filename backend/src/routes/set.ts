import { Router } from "express";
import { getSets, createSet, deleteSet } from "../controllers/setController";

const router = Router();

router.get("/", getSets);
router.post("/", createSet);
router.delete("/", deleteSet);

export default router;
