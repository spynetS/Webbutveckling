import * as e from "express";
import ExerciseTemplate from "../models/ExerciseTemplate";
import ApiResponse from "../database/response";


export async function getExercise(req:e.Request, res: e.Response){
	ExerciseTemplate.find().then(found=>{
		res.json(new ApiResponse({data:found}))
	})
}

export async function create(req:e.Request, res: e.Response){
	ExerciseTemplate.create(req.body).then(status=>{
	    res.json(new ApiResponse({data:status}))
	}).catch(err=>{
		res.json(new ApiResponse({status:"error",message:err.message}))
	})
}

export async function deleteExercise(req:e.Request, res: e.Response){
	if(!("id" in req.body)){
		res.json(new ApiResponse({status:"error",message:"No id was provided!"}));
		return;
	}
	const exercise: ExerciseTemplate = ExerciseTemplate.findById(req.body.id);
	ExerciseTemplate.deleteOne(exercise).then(status=>{
		res.json(new ApiResponse({data:status}))
	}).catch(error=>{
		res.json(new ApiResponse({status:"error",message:error.message}))
	})
}
