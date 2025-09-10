import { Schema, model, Document } from "mongoose";

// 1. Define an interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  friend-code: string;
  weight: number;
  friends: Types.ObjectId[]; // array of User references
  createdAt: Date;
}

// 2. Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }] 
});

// 3. Create the model
const User = model<IUser>("User", userSchema);

export default User;
