import User from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";
import stats from "../database/stats";
import { canDo } from "./permissionController";

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

    if (!canDo(user)) {
      return res
        .status(401)
        .json(new ApiResponse({ status: "fail", data: "No permissions" }));
    }

    user.weightGoal = weightGoal;
    await user.save();

    res.json(new ApiResponse({ data: user }));
  } catch (error: Error) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", message: error.message }));
  }
}

export async function getWeightGoalProgress(req: Request, res: Response) {
  try {
    const progress = await stats.getWeightProgress(req.session.userId);
    res.json(new ApiResponse({ data: { progress: Math.round(progress) } }));
  } catch (error: Error) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", data: error.message }));
  }
}
