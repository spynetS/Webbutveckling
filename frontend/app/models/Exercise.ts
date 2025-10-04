interface Set {
  reps: number;
  weight: number;
}

export default interface Exercise {
  title: string;
  description: string;
  sets: Set[];
}
