import { Schema, model, Document } from "mongoose";

// 1. Define an interface for TypeScript
export interface IExerciseTemplate extends Document {
  title: string;
  description: string;
  muscleGroups: string[];
	image: string;
  exerciseType: string;
  creator: Schema.Types.ObjectId;
  createdAt: Date;
}

// 2. Define the schema
const exerciseTemplateSchema = new Schema<IExerciseTemplate>({
  title: { type: String, required: true },
  description: { type: String },
  muscleGroups: [{ type: String }],
	image: {type: String },
  exerciseType: { type: String },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// 3. Create the model
const ExerciseTemplate = model<IExerciseTemplate>(
  "ExerciseTemplate",
  exerciseTemplateSchema,
);

export default ExerciseTemplate;
