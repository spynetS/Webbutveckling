import mongoose from "mongoose";

export const DATABASE_URI = process.env.DATABASE_URI || "mongodb://localhost:27017/mydb";

export async function init(uri?: string) {
  const mongoUri = uri || DATABASE_URI;
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
