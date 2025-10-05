import type e from "express";

import { getTotalSessions } from "../database/stats";
import ApiResponse from "../database/response";
import { getWeightProgress } from "../database/stats";

export async function getStats(req: e.Request, res: e.Response) {
  if (!req.session.userId)
    res.json(new ApiResponse({ status: "fail", data: "login" }));
  const sessions = await getTotalSessions(req.session.userId);

  const weightProgress = await getWeightProgress(req.session.userId);

  res.json(
    new ApiResponse({
      data: {
        sessions: sessions,
        weightProgress: weightProgress,
      },
    }),
  );
}
