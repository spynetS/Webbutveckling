import { Schema, model, Document } from "mongoose";

// 1. Define an interface for TypeScript
export interface ISet extends Document {
  reps: number;
  weight: number;
  duration: number;

  user: Schema.Types.ObjectId;
  template: Schema.Types.ObjectId;
  createdAt: Date;
}

// 2. Define the schema
const setSchema = new Schema<ISet>({
  reps: { type: Number },
  weight: { type: Number },
  duration: { type: Number },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  template: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ExerciseTemplate",
  },
  createdAt: { type: Date, default: Date.now },
});

// 3. Create the model
//
const Set = model<ISet>("Set", setSchema);

export default Set;
