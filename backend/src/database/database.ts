import mongoose from "mongoose";

const DATABASE_URI = "mongodb://root:example@localhost:27017/mydb?authSource=admin";

export function init(){
	mongoose.connect(DATABASE_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
}
