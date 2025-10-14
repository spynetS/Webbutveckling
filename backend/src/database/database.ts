import mongoose from "mongoose";

export function init(DATABASE_URI: string) {
  mongoose
    .connect(DATABASE_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB co1nnection error:", err));
}
