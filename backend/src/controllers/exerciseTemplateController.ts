import * as e from "express";
import ExerciseTemplate from "../models/ExerciseTemplate";
import ApiResponse from "../database/response";
import User from "../models/User";
import mongoose from "mongoose";
import Set from "../models/Set"
import { calculateStrength } from "../database/stats"

export async function getExercise(req: e.Request, res: e.Response) {
  ExerciseTemplate.find().then((found) => {
    res.json(new ApiResponse({ data: found }));
  });
}

export async function create(req: e.Request, res: e.Response) {
  try {
    if (!req.session.userId)
      return res.json(new ApiResponse({ status: "fail", data: "Login" }));

    const body = req.body;
    const user = await User.findById(req.session.userId);

    if (!user) {
      throw new Error("User not found");
    }

    body.creator = user._id;

    const newExercise = await ExerciseTemplate.create(body);
    res.json(new ApiResponse({ data: newExercise }));
  } catch (err: Error) {
    res.json(new ApiResponse({ status: "error", message: err.message }));
  }
}

export async function deleteExercise(req: e.Request, res: e.Response) {
  if (!("id" in req.body)) {
    res.json(
      new ApiResponse({ status: "error", message: "No id was provided!" }),
    );
    return;
  }
  const exercise: ExerciseTemplate = ExerciseTemplate.findById(req.body.id);
  ExerciseTemplate.deleteOne(exercise)
    .then((status) => {
      res.json(new ApiResponse({ data: status }));
    })
    .catch((error) => {
      res.json(new ApiResponse({ status: "error", message: error.message }));
    });
}


export async function setImage(req: e.Request, res: e.Response){
	if (!("id" in req.body)) {
    res.json(
      new ApiResponse({ status: "fail", data: "No id was provided!" }),
    );
    return;
  }
	if (!("image" in req.body)) {
    res.json(
      new ApiResponse({ status: "fail", data: "No image was provided!" }),
    );
    return;
  }
  const exercise: ExerciseTemplate = await ExerciseTemplate.findById(req.body.id);
	exercise.image = req.body.image;
	await exercise.save();
	res.json(new ApiResponse({data:{}}));
}
export async function stats(req: e.Request, res: e.Response) {

	const reps = [];
	const weights = [];
	const strengths = [];
	const dates = [];
	if("_id" in req.body){
		const sets = await Set.find({template:new mongoose.Types.ObjectId(req.body._id)})
		sets.forEach(aSet => {
			reps.push(aSet.reps)
			weights.push(aSet.weight)
			strengths.push(calculateStrength(aSet.reps,aSet.weight))
			dates.push(aSet.createdAt)
			
		});
		return res.json(new ApiResponse({data:{
			reps:reps,
			weights:weights,
			strengths:strengths,
			labels:dates
		}}))
	}

	
}
