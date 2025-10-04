import type { Model } from "~/models/Model";

export type Set = Model & {
  template: number;
  user: number;
  reps: number;
  weight: number;
};
