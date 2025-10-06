import User from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";

function getUserId(req: Request): string | undefined
{
    return req.session.userId;
}

export async function lbFriends(req: Request, res: Response)
{
    const uid = getUserId(req);
    if(!uid)
    {
        return res.status(401).json(new ApiResponse.error("Unauthorized"));
    }

    const me = await User.findById(uid).populate("friends");
    if(!me)
    {
        return res.status(404).json(new ApiResponse.error("User not found"));
    }

    

    // friends to leaderboard with data, PLES WORK
    const leaderboardfriends = (me.friends as any[]).map((f) => {
        const score = f.score || 0;
        const weightGoal = Number(f.weightGoal) || 0;
        const percent = weightGoal > 0 ? (score / weightGoal) * 100 : 0;
        return {
            _id: String(f._id), //bonus ksk ksksksksksk
            name: f.name,
            avatar: f.avatar,
            weightGoal,
            score,
            percent
        };
    });

    // sort by score, then by percent, FIX FIX FIX FIX FIX FIX, STILL BUGGY
    leaderboardfriends.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.percent - a.percent;
    });

    return res.json(ApiResponse.success(leaderboardfriends));
}