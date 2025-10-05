import { Schema, model, Document } from "mongoose";

const weightLogSchema = new Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const WeightLog = model("WeightLog", weightLogSchema);

// 1. Define an interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  weightLogs: [Schema.Types.ObjectId];
  weightGoal: number;
  createdAt: Date;
  password: string;
}

// 2. Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  weightLogs: [{ type: Schema.Types.ObjectId, ref: "WeightLog" }],
  weightGoal: { type: Number },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true, unique: false },
});

// 3. Create the model
const User = model<IUser>("User", userSchema);

export default User;
