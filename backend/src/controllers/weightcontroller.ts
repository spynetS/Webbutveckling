import User from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";
import stats from "../database/stats";
import { Goal } from "../models/User";

// TODO change so this function adds a new 'weight goal' to the users goals array
export async function setWeightGoal(req: Request, res: Response) {
  try {
    const userId = req.session.userId;
    const { weightGoal } = req.body;

    if (!weightGoal) {
      return res.json(
        new ApiResponse({ status: "fail", data: "Weight goal is required" }),
      );
    }

    const user: User = await User.findById(userId);

    //user.weightGoal = weightGoal;

    const newGoal = await Goal.create({
      progress: 0,
      current: weightGoal,
      achieved: false,
    });
    user.goals.push(newGoal._id);

    await user.save();

    res.json(new ApiResponse({ data: user }));

  } catch (error: Error) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", message: error.message }));
  }
}

// TODO change so we filter to get the new weight goal and return the progress of that goal
export async function getWeightGoalProgress(req: Request, res: Response) {
  try {

    //const progress = await stats.getWeightProgress(req.session.userId);
    //res.json(new ApiResponse({ data: { progress: Math.round(progress) } }));

    const userId = req.session.userId;
    const user = await User.findById(userId).populate("goals");

    if(!user || !user.goals || user.goals.length === 0)
    {
      return res.json(new ApiResponse({ status: "fail", data: "No weight goals found" }));
    }

    const latestGoal = user.goals[user.goals.length - 1];
    res.json(new ApiResponse({ data: { progress: latestGoal.progress, current: latestGoal.current, achieved: latestGoal.achieved } }));
    
  } catch (error: Error) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", data: error.message }));
  }
}
