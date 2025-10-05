import { Request, Response } from "express";
import { Types } from "mongoose";
import ApiResponse from "../database/response";
import Set from "../models/Set";                 // <-- adjust path if needed
import User from "../models/User";               // already in your repo
import UserFriend from "../models/user.friends"; // <-- adjust to your actual filename/export

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export async function getNotifications(req: Request, res: Response) {
  try {
    const userId = req.session?.userId as string | undefined;
    if (!userId) {
      return res
        .status(401)
        .json(new ApiResponse({ status: "fail", message: "Not logged in", data: [] }));
    }

    const start = startOfToday();
    const end = endOfToday();

    // 1) Did the user train today? (any Set logged today)
    // If you track workouts elsewhere, replace Set with your model and date field.
    const trainedToday = !!(await Set.findOne({
      userId: new Types.ObjectId(userId),
      createdAt: { $gte: start, $lte: end },
    }).lean());

    // 2) Which friends trained today?
    // We collect friend IDs from both directions (user->friend and friend->user).
    const [a, b] = await Promise.all([
      UserFriend.find({ userId: userId, status: "accepted" }).lean(),
      UserFriend.find({ friendId: userId, status: "accepted" }).lean(),
    ]);

    const friendIds = Array.from(
      new Set<string>([
        ...a.map((f: any) => f.friendId?.toString()),
        ...b.map((f: any) => f.userId?.toString()),
      ].filter(Boolean) as string[])
    );

    let friendNames: string[] = [];
    if (friendIds.length > 0) {
      const trainedFriendRows = await Set.aggregate([
        {
          $match: {
            userId: { $in: friendIds.map((id) => new Types.ObjectId(id)) },
            createdAt: { $gte: start, $lte: end },
          },
        },
        { $group: { _id: "$userId" } },
      ]);

      const trainedFriendIds = trainedFriendRows.map((r) => r._id);
      if (trainedFriendIds.length) {
        const friends = await User.find(
          { _id: { $in: trainedFriendIds } },
          { name: 1 }
        ).lean();
        friendNames = friends.map((f: any) => f.name).filter(Boolean);
      }
    }

    // 3) Build notifications list
    const notifications: { id: string; message: string; kind?: "info" | "warning" | "success" }[] = [];

    if (!trainedToday) {
      notifications.push({ id: "should-train", message: "You should train today.", kind: "info" });
      notifications.push({ id: "not-trained", message: "You haven’t trained today.", kind: "warning" });

      if (friendNames.length) {
        const shown = friendNames.slice(0, 3).join(", ");
        const extra = friendNames.length > 3 ? ` and ${friendNames.length - 3} others` : "";
        notifications.push({
          id: "friends-trained",
          message: `${shown}${extra} has trained—you should do that too!`,
          kind: "success",
        });
      }
    }

    return res.json(new ApiResponse({ data: notifications }));
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json(new ApiResponse({ status: "error", message: "Failed to get notifications", data: [] }));
  }
}
