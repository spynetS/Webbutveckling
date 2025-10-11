export type User = {
  name: string;
  email: string;
  password: string;
  weightGoal: number;
  weightLogs: {weight:number}[];
};
