// src/models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  meals: {
    breakfast: { type: String }, // URL of the breakfast image
    lunch: { type: String }, // URL of the lunch image
    dinner: { type: String }, // URL of the dinner image
  },
});

export default mongoose.model("Meal", mealSchema);
