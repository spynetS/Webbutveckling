import type e from "express";

import { getTotalSessions } from "../database/stats";
import ApiResponse from "../database/response";
import { getWeightProgress, getStrengthProgress } from "../database/stats";

export async function getStats(req: e.Request, res: e.Response) {
  if (!req.session.userId)
    res.json(new ApiResponse({ status: "fail", data: "login" }));

  try {
    const sessions = await getTotalSessions(req.session.userId);

		const weightProgress = await getWeightProgress(req.session.userId).catch((error:Error) => {return null});
		
    const strengthProgress = await getStrengthProgress(
      req.session.userId,
      "all",
    );

    res.json(
      new ApiResponse({
        data: {
          sessions: sessions,
          weightProgress: weightProgress,
          strengthProgress: strengthProgress,
        },
      }),
    );
  } catch (error: unknown) {
    return res.json(
      new ApiResponse({ status: "error", message: error.message }),
    );
  }
}
