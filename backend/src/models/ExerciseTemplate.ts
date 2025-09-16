import { Schema, model, Document } from "mongoose";

// 1. Define an interface for TypeScript
export interface IExerciseTemplate extends Document {
  title: string;
  description: string;
  creator: Schema.Types.ObjectId;
  createdAt: Date;
}

// 2. Define the schema
const excersiceTemplateSchema = new Schema<IExerciseTemplate>({
  title: { type: String, required: true },
  description: { type: String },
  creator: {type: Schema.Types.ObjectId, required: true},
  createdAt: { type: Date, default: Date.now },
});

// 3. Create the model
const ExcersiceTemplate = model<IExerciseTemplate>("ExerciseTemplate", userSchema);

export default ExcersiceTemplate;
