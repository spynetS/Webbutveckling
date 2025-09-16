import { Router, Request, Response, NextFunction } from "express";
import ApiResponse from "../database/response";
import ExerciseTemplate from "../models/ExerciseTemplate"

const router = Router();

router.get("/",(req: Request, res: Response) =>{
	ExerciseTemplate.find().then(found=>{
		res.json(new ApiResponse({data:found}))
	})

})

export default router;
