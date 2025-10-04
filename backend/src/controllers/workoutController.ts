import type e from "express";
import Workout from "../models/workout";
import ApiResponse from "../database/response";

export async function getWorkout(req: e.Request, res: e.Response){
	Workout.find().then(found=>{
		res.json(new ApiResponse({data:found}))
	}).catch(error=>{
		res.json(new ApiResponse({status:"error",message:error.message}))
	})
}

export async function createWorkout(req:e.Request, res: e.Response){
	Workout.create(req.body).then(status=>{
	    res.json(new ApiResponse({data:status}))
	}).catch(err=>{
		res.json(new ApiResponse({status:"error",message:err.message}))
	})
}

export async function deleteWorkout(req:e.Request, res: e.Response){
	if(!("id" in req.body)){
		res.json(new ApiResponse({status:"error",message:"No id was provided!"}));
		return;
	}
	const workout: Workout = Workout.findById(req.body.id);
	Workout.deleteOne(workout).then(status=>{
		res.json(new ApiResponse({data:status}))
	}).catch(error=>{
		res.json(new ApiResponse({status:"error",message:error.message}))
	})
}
