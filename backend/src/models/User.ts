import { Schema, model, Document } from "mongoose";

// 1. Define an interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  weight: number;
  createdAt: Date;
  password: string;
}

// 2. Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  weight: {type: Number, required: true, default: 0},
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true, unique: false},
});

// 3. Create the model
const User = model<IUser>("User", userSchema);

export default User;
