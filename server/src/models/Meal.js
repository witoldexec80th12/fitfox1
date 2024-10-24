// src/models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  meal: {
    type: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "walking"],
      default: "breakfast"
    },
    data: { type: String, default: "" },
    reviewed: { type: Boolean, default: false }
  }
});

export default mongoose.model("Meal", mealSchema);
