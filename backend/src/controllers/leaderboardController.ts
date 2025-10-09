import User, { Goal } from "../models/User";
import ApiResponse from "../database/response";
import { Request, Response } from "express";
import userController = require("./userController");
import stats = require("../database/stats");
import weightcontroller = require("./weightcontroller");

function getUserId(req: Request): string | undefined {
  return req.session.userId;
}

export async function lbFriends(req: Request, res: Response) {
  const uid = getUserId(req);
  if (!uid) {
    return res.status(401).json(ApiResponse.error("Unauthorized"));
  }

  const me = await User.findById(uid).populate("friends").populate("goals");
  if (!me) {
    return res.status(404).json(ApiResponse.error("User not found"));
  }

  // friends to leaderboard with data, PLES WORK
  const users = me.friends;
  users.push(me); // adds us

  const leaderboardfriends = await Promise.all(
    (users as User[]).map(async (f) => {
      let score = f.score || 0;
      const weightGoal = Number(f.weightGoal) || 0;

      async function updateGoalsAndScore(user: User) {
        // ^^^^^^^^^^^ TODO almost done, uncertain about where and how to handle the percentage w both goals in mind
        let totalProgress = 0;
        if (!user.goals) {
          return 0;
        }

        for (const goal of user.goals) {
          if (goal.achieved) continue;

          console.log(goal);

          const progress =
            ((goal.start - goal.current) / (goal.start - goal.goal)) * 100;

          const percent = parseInt(progress);
          totalProgress += percent;

          if (percent >= 100) {
            goal.achieved = true; // mark as achieved, do we wanna put old ones aside or????????????
            user.score = (user.score || 0) + 1;
            await goal.save();
            await user.save();
          }
        }

        return totalProgress;
      }
      //let percent = parseInt(await stats.getGoalProgress(f._id, "weight")); OLD ONE
      const populated = await f.populate("goals");
      let percent = await updateGoalsAndScore(populated);

      return {
        _id: String(f._id), //bonus ksk ksksksksksk
        name: f.name,
        avatar: f.avatar,
        weightGoal,
        score,
        percent,
      };
    }),
  );

  // sort by score, then by percent, FIX FIX FIX FIX FIX FIX, STILL BUGGY
  leaderboardfriends.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.percent - a.percent;
  });

  return res.json(new ApiResponse({ data: leaderboardfriends }));
}
