import type e from "express";
import Set from "../models/Set";
import ApiResponse from "../database/response";
import mongoose from "mongoose"

export async function getSets(req: e.Request, res: e.Response) {
  Set.find()
    .populate("template") // replace ObjectIds in exercises with the actual Exercise documents
    .populate("user", "name email") // optionally select only certain fields from user
    .sort({ createdAt: 1 }) // oldest first
    .then((found) => {
      res.json(new ApiResponse({ data: found }));
    })
    .catch((error) => {
      res.json(new ApiResponse({ status: "error", message: error.message }));
    });
}

export async function createSet(req: e.Request, res: e.Response) {
  const { reps, weight, duration, user, template } = req.body;

  const payload = {
    reps: Number(reps),
    weight: Number(weight),
    duration: Number(duration),
    user,
    template,
  };

  Set.create(payload)
    .then((status) => {
      res.json(new ApiResponse({ data: status }));
    })
    .catch((err) => {
      res.json(new ApiResponse({ status: "error", message: err.message }));
    });
}

export async function deleteSet(req: e.Request, res: e.Response) {
  if (!("id" in req.body)) {
    res.json(
      new ApiResponse({ status: "fail", data: "No id was provided!" }),
    );
    return;
  }
  const set: Set = Set.findById(req.body.id);
  Set.deleteOne(set)
    .then((status) => {
      res.json(new ApiResponse({ data: status }));
    })
    .catch((error) => {
      res.json(new ApiResponse({ status: "error", message: error.message }));
    });
}
