// Extends the existing User model with friendCode + friends (no edits to User.ts)
import { Schema, Types } from "mongoose";
import User from "./User";

// ---- TypeScript augmentation of IUser from ./User ----
declare module "./User" {
  interface IUser {
    friendCode?: string;           // e.g., "FD-AB12-CD34"
    friends: Types.ObjectId[];     // refs to other User docs
  }
}

// ---- Add paths to the compiled schema ----
User.schema.add({
  friendCode: { type: String, unique: true, sparse: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

// Unique index (safe even if recreated)
User.schema.index({ friendCode: 1 }, { unique: true, sparse: true });

export {}; // side-effect only
