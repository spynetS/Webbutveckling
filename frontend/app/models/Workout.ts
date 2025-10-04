import type Exercise from "~/models/Exercise";
import type { Model } from "~/models/Model";

export type Workout = Model & {
  _id: string;
  title: string;
  weekday: string;
  exercises: Exercise[];
};
