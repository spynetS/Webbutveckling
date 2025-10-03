import type { Model } from "~/models/Model";

type Set = Model & {
  reps: number;
  weight: number;
};

export type Exercise = Model & {
  title: string;
  description: string;
  sets: Set[];
};
