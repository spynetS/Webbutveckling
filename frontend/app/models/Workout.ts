import type Exercise from "~/models/Exercise";

export type Workout = {
  title: string;
  weekday: string;
  exercises: Exercise[];
};
