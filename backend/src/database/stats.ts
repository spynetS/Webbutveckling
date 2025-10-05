import Set from "../models/Set";
import User from "../models/User";
import mongoose from "mongoose";

export async function getTotalSessions(userId?: string) {
  const matchStage = userId
    ? { $match: { user: new mongoose.Types.ObjectId(userId) } }
    : { $match: {} };

  const result = await Set.aggregate([
    matchStage,
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      },
    },
    { $group: { _id: "$date" } },
    { $count: "totalSessions" },
  ]);

  return result[0]?.totalSessions || 0;
}

export async function getWeightProgress(userId: number) {
  const user = await User.findById(userId).populate("weightLogs");
  if (
    !user ||
    !user.weightGoal ||
    !user.weightLogs ||
    user.weightLogs.length === 0
  ) {
    throw new Error("Not enough data");
  }

  // weights
  const startWeight = user.weightLogs[0].weight;
  const currentWeight = user.weightLogs[user.weightLogs.length - 1].weight;
  const goalWeight = user.weightGoal;

  console.log(goalWeight);

  // calculate progress
  const totalChangeNeeded = Math.abs(goalWeight - startWeight);
  const changeSoFar = Math.abs(currentWeight - startWeight);
  const progress =
    totalChangeNeeded === 0
      ? 0
      : Math.min((changeSoFar / totalChangeNeeded) * 100, 100);
  console.log(progress);
  return progress;
}
