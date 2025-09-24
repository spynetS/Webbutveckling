import type e from "express";
import Set from "../models/Set";
import ApiResponse from "../database/response";

export async function getSet(req: e.Request, res: e.Response){
	Set.find().then(found=>{
		res.json(new ApiResponse({data:found}))
	}).catch(error=>{
		res.json(new ApiResponse({status:"error",message:error.message}))
	})
}

export async function createSet(req:e.Request, res: e.Response){
	Set.create(req.body).then(status=>{
	    res.json(new ApiResponse({data:status}))
	}).catch(err=>{
		res.json(new ApiResponse({status:"error",message:err.message}))
	})
}

export async function deleteSet(req:e.Request, res: e.Response){
	if(!("id" in req.body)){
		res.json(new ApiResponse({status:"error",message:"No id was provided!"}));
		return;
	}
	const set: Set = Set.findById(req.body.id);
	Set.deleteOne(set).then(status=>{
		res.json(new ApiResponse({data:status}))
	}).catch(error=>{
		res.json(new ApiResponse({status:"error",message:error.message}))
	})
}
