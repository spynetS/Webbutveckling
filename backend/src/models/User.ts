import { Schema, model, Document } from "mongoose";

const weightLogSchema = new Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const goal = new Schema({
  label: { type: String, required: true },
  goal: { type: Number, required: false },
  current: { type: Number, required: false },
  start: { type: Number, required: false },
  achieved: { type: Boolean, default: false },
});

export const WeightLog = model("WeightLog", weightLogSchema);
export const Goal = model("Goal", goal);

const permissionSchema = new Schema({
  action: {
    type: String,
    enum: ["read", "write", "delete", "update"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // assuming permissions belong to a user
    required: true,
  },
  modelType: {
    type: String,
    required: true,
    enum: ["ExerciseTemplate"], // list of model names
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "modelType", // <-- magic here
  },
});

export const Permission = model("Permission", permissionSchema);

// 1. Define an interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  score: number;
  goals: goal[];
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
  goals: [{ type: Schema.Types.ObjectId, ref: "Goal", default: [] }],
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
