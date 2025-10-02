import User, { WeightLog } from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";

export async function setWeightGoal(req: Request, res: Response) {
    try 
    {
        const userId = req.session.userId;
        const { weightGoal } = req.body;

        if(!weightGoal)
        {
            return res.json(new ApiResponse({status:"fail", data:"Weight goal is required"}));
        }

        const user = await User.findByIdAndUpdate(userId, { weightGoal }, { new: true });
        res.json(new ApiResponse({ data: user }));
    } 
    catch(error: any) 
    {
        res.status(500).json(new ApiResponse({ status: "error", message: error.message }));
    }
}

export async function getWeightGoalProgress(req: Request, res: Response) {
    try 
    {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (!user || !user.weightGoal || !user.weightLogs || user.weightLogs.length === 0) 
        {
            return res.json(new ApiResponse({ status: "fail", data: "Not enough data" }));
        }
        
        // weights
        const startWeight = user.weightLogs[0].weight;
        const currentWeight = user.weightLogs[user.weightLogs.length - 1].weight;
        const goalWeight = user.weightGoal;
        
        // calculate progress
        const totalChangeNeeded = Math.abs(goalWeight - startWeight);
        const changeSoFar = Math.abs(currentWeight - startWeight);
        const progress = totalChangeNeeded === 0 ? 0 : Math.min((changeSoFar / totalChangeNeeded) * 100, 100);

        res.json(new ApiResponse({ data: { progress: Math.round(progress) } }));
    }
    catch(error: any) 
    {
        res.status(500).json(new ApiResponse({ status: "error", data: error.message }));
    }
}