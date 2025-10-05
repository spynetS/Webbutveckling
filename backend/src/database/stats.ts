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

function calculateStrength(reps: number, weight: number): number {
  return weight * (1 + reps / 30);
}

export async function getStrengthProgress(userId: number, muscleGroup: string) {
  const muscles = ["Chest", "Legs", "Arms", "Back"];
  const user: User = User.findById(userId);
  const sets = await Set.find().populate("template");

  let response = [];

  muscles.forEach((muscle) => {
    const filtered = sets.filter((s) =>
      s.template?.muscleGroups.includes(muscle),
    );

    const strengthPoints = filtered.map((aSet) => {
      return {
        date: aSet.createdAt,
        strength: calculateStrength(aSet.reps, aSet.weight),
      };
    });

    let progress = 0;

    if (strengthPoints.length > 0) {
      const startStrength = strengthPoints[0].strength; // get the number
      const maxStrength = Math.max(...strengthPoints.map((sp) => sp.strength));

      progress = ((maxStrength - startStrength) / startStrength) * 100;
    }

    response.push({
      muscleGroup: muscle,
      progress: progress,
      strengthPoints: strengthPoints,
    });
  });

  return response;
}
