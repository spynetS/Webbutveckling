import User, { WeightLog } from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";
import stats = require("../database/stats");

export async function setWeightGoal(req: Request, res: Response) {
  try {
    const userId = req.session.userId;
    const { weightGoal } = req.body;

    if (!weightGoal) {
      return res.json(
        new ApiResponse({ status: "fail", data: "Weight goal is required" }),
      );
    }

    let user: User = await User.findById(userId);
    user.weightGoal = weightGoal;
    await user.save();

    res.json(new ApiResponse({ data: user }));
  } catch (error: any) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", message: error.message }));
  }
}

export async function getWeightGoalProgress(req: Request, res: Response) {
  try {
    const progress = await stats.getWeightProgress(req.session.userId);
    res.json(new ApiResponse({ data: { progress: Math.round(progress) } }));
  } catch (error: any) {
    res
      .status(500)
      .json(new ApiResponse({ status: "error", data: error.message }));
  }
}
