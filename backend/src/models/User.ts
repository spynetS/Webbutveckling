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
  score: number;
  weightLogs: [Schema.Types.ObjectId];
  weightGoal: number;
  friendCode: string;
  friends: Schema.Types.ObjectId[];
  createdAt: Date;
  password: string;
}

// 2. Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  score: { type: Number },
  weightLogs: [{ type: Schema.Types.ObjectId, ref: "WeightLog" }],
  weightGoal: { type: Number },
  friendCode: { type: String, unique: true, sparse: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true, unique: false },
});

// 3. Create the model
const User = model<IUser>("User", userSchema);

export default User;
