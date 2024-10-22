import mongoose from "mongoose";
import Meal from "../models/Meal.js";
import User from "../models/User.js";

// Helper function to normalize the date (remove time)
const normalizeDate = (date) => {
  const requestDate = new Date(date);
  requestDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return requestDate;
};

const generateDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  return date
};

// Add or update daily meal photos
export const addMealPhotos = async (req, res) => {
  const { userId, meals } = req.body;
  console.log("userId and meals: ", userId, meals);

  const user = await User.findOne({ tgId: userId });

  if (!user) return res.status(404).json({ error: "User not found" });

  const date = normalizeDate(new Date()); // Always use the current date, normalized

  try {
    // Find the meal document for the given user and normalized date
    let mealDoc = await Meal.findOne({ userId, date });

    // If no meal document exists, create a new one with the provided meal
    if (!mealDoc) {
      const newMeal = new Meal({
        userId,
        date, // Save only the normalized date
        meals,
      });
      await newMeal.save();
      return res.status(201).json(newMeal);
    } else {
      // Update the existing meal document
      mealDoc.meals = {
        ...mealDoc.meals,   // Merge existing meals (assuming it's an object)
        ...meals            // Merge with new meals (you may want different logic here)
      };
      const updatedMealDoc = await mealDoc.save();
      return res.status(200).json(updatedMealDoc);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get meals by user ID and date (ignoring time)
export const getMeals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const requestedDate = generateDate(req.params.date); // Normalize requested date
    console.log("userId and requestedDate: ", userId, requestedDate);

    // Find the meal document where the date falls within the given day (ignoring time)
    const meals = await Meal.findOne({
      userId,
      date: {
        $gte: requestedDate, // Start of the day
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000), // End of the day
      },
    });

    if (!meals) return res.status(404).json({ error: "Meals not found" });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
