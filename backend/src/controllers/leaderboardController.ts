import User from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";
import userController = require("./userController");
import stats = require("../database/stats");
import weightcontroller = require("./weightcontroller");

function getUserId(req: Request): string | undefined
{
    return req.session.userId;
}

export async function lbFriends(req: Request, res: Response)
{
    const uid = getUserId(req);
    if(!uid)
    {
        return res.status(401).json(ApiResponse.error("Unauthorized"));
    }

    const me = await User.findById(uid).populate("friends");
    if(!me)
    {
        return res.status(404).json(ApiResponse.error("User not found"));
    }

    

    // friends to leaderboard with data, PLES WORK
    const leaderboardfriends = await Promise.all((me.friends as any[]).map(async (f) => {
        let score = f.score || 0;
        const weightGoal = Number(f.weightGoal) || 0;
        const percent = parseInt((await stats.getWeightProgress(f._id)));
        // TODO fix a general function to return progress of all goals
        
            if(percent == 100)
            {
                score += 1;
                f.score = score;
                await f.save();
            }


        return {
            _id: String(f._id), //bonus ksk ksksksksksk
            name: f.name,
            avatar: f.avatar,
            weightGoal,
            score,
            percent
        };
    }));

    // sort by score, then by percent, FIX FIX FIX FIX FIX FIX, STILL BUGGY
    leaderboardfriends.sort((a, b) => {
        if(b.score !== a.score) return b.score - a.score;
        return b.percent - a.percent;
    });

    return res.json(new ApiResponse({data:leaderboardfriends}));
}