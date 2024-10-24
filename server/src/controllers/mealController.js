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
  return date;
};

// Add or update daily meal photos
export const addMealPhotos = async (req, res) => {
  const { userId, meal } = req.body;
  console.log("userId and meals: ", userId, meal);

  const user = await User.findOne({ tgId: userId });

  if (!user) return res.status(404).json({ error: "User not found" });

  const date = normalizeDate(new Date()); // Always use the current date, normalized

  try {
    // Find the meal document for the given user and normalized date
    let mealDoc = await Meal.findOne({ userId, date, "meal.type": meal.type });

    // If no meal document exists, create a new one with the provided meal
    if (!mealDoc) {
      const newMeal = new Meal({
        userId,
        date, // Save only the normalized date
        meal: {
          ...meal,
          reviewed: false,
        },
      });
      await newMeal.save();
      return res.status(201).json(newMeal);
    } else {
      return res.status(400).json({ error: "Data already exist." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get meals by user ID and date (ignoring time)
export const getMealsByIDDate = async (req, res) => {
  const userId = req.params.userId;
  const requestedDate = generateDate(req.params.date); // Normalize requested date
  console.log("userId and requestedDate: ", userId, requestedDate);

  try {
    // Find the meal document where the date falls within the given day (ignoring time)
    const meals = await Meal.find({
      userId,
      date: {
        $gte: requestedDate, // Start of the day
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000), // End of the day
      },
    });
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
