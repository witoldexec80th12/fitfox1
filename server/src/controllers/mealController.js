import mongoose from "mongoose";
import Meal from "../models/Meal.js";
import User from "../models/User.js";

import { isWithinOneDay } from "../utils/helpers.js";

// Helper function to generate a date from string in format "dd-mm-yyyy"
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

  const currentDate = new Date(); // Current date with full timestamp
  const savingDate = currentDate;
  const mealType = meal.type;

  try {
    // Step 1: Update User tasks based on meal type
    const user = await User.findOne({ tgId: userId });
    if (!user) throw new Error("User not found");

    const task = user.tasks[mealType];
    if (task) {
      if (task.subscriptionDate !== 0) {
        if (isWithinOneDay(currentDate, task.lastUpdated)) {
          console.log("task performed within 2 days");
          // Increment subscriptionDate if within 1 day
          task.subscriptionDate += 1;

          if (task.subscriptionDate === 10) {
            user.point = user.point + 50 + 300;
          } else if (task.subscriptionDate === 20) {
            user.point = user.point + 50 + 600;
          } else if (task.subscriptionDate === 30) {
            let allSubscriptionDatesAre30 = true; // Initialize a flag to true
            Object.keys(user.tasks).forEach((key) => {
              if (key !== specificKeyToSkip) {
                if (user.tasks[key].subscriptionDate !== 30) {
                  allSubscriptionDatesAre30 = false; // Set flag to false if any subscriptionDate is not 30
                }
              }
            });

            if (allSubscriptionDatesAre30) {
              user.point += 5000;
            }
          } else if (task.subscriptionDate === 45) {
            user.point = user.point + 50 + 1500;
          } else if (task.subscriptionDate === 60) {
            let allSubscriptionDatesAre60 = true; // Initialize a flag to true
            Object.keys(user.tasks).forEach((key) => {
              if (key !== specificKeyToSkip) {
                if (user.tasks[key].subscriptionDate !== 60) {
                  allSubscriptionDatesAre60 = false; // Set flag to false if any subscriptionDate is not 30
                }
              }
            });

            if (allSubscriptionDatesAre60) {
              user.point += 5000;
            }
          } else if (task.subscriptionDate === 90) {
            user.point = user.point + 50 + 5000;

            let allSubscriptionDatesAre90 = true; // Initialize a flag to true
            Object.keys(user.tasks).forEach((key) => {
              if (key !== specificKeyToSkip) {
                if (user.tasks[key].subscriptionDate !== 90) {
                  allSubscriptionDatesAre90 = false; // Set flag to false if any subscriptionDate is not 30
                }
              }
            });

            if (allSubscriptionDatesAre90) {
              user.point += 5000;
            }
          } else {
            user.point += 50;
          }
        } else {
          // Reset subscriptionDate if more than 1 day
          task.subscriptionDate = 0;
        }
      } else {
        // Initialize subscriptionDate if no lastUpdated date
        task.subscriptionDate = 1;
        user.point += 50;
      }
      // Update lastUpdated to the current date
      task.lastUpdated = currentDate;
    } else {
      // Initialize task if it doesn't exist
      user.tasks[mealType] = {
        subscriptionDate: 1,
        lastUpdated: currentDate,
      };
    }

    const savedUser = await user.save();

    // Step 2: Add or update the Meal document within the transaction
    const mealDoc = await Meal.findOne({
      userId,
      date: {
        $gte: new Date(currentDate.setHours(0, 0, 0, 0)), // Start of the day
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // End of the day
      },
      "meal.type": mealType,
    });

    if (!mealDoc) {
      // If no meal document exists, create a new one
      const newMeal = new Meal({
        userId,
        date: savingDate, // Save the exact date and time
        meal: {
          ...meal,
          reviewed: false,
        },
      });
      await newMeal.save();
      return res.status(201).json({
        message: "Meal added and User tasks updated successfully",
        user: savedUser,
        meal: newMeal,
      });
    } else {
      console.log("task already performed in today")
      // Revert user update if meal already exists
      user.tasks[mealType].subscriptionDate -= 1; // Rollback subscriptionDate change
      user.tasks[mealType].lastUpdated = task.lastUpdated; // Restore lastUpdated

      await user.save();
      return res.status(400).json({ error: "Data already exists." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get meals by user ID and date (ignoring time)
export const getMealsByIDDate = async (req, res) => {
  const userId = req.params.userId;
  const requestedDate = generateDate(req.params.date); // Start of the requested day
  console.log("userId and requestedDate: ", userId, requestedDate);

  try {
    // Find meals where the date falls within the requested day
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

// Get all meals
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
