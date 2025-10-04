import Set from "../models/Set";
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
