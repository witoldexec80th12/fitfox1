import Meal from "../models/Meal.js";

// Helper function to normalize the date (remove time)
const normalizeDate = (date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return normalizedDate;
};

// Add or update daily meal photos
export const addMealPhotos = async (req, res) => {
  const { userId, meals } = req.body;
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
    }

    // Check if the provided meal(s) already exist in the document
    for (const mealKey in meals) {
      if (meals[mealKey] && mealDoc.meals[mealKey]) {
        return res
          .status(400)
          .json({ error: `${mealKey} already exists for this date` });
      }
    }

    // Update the document with the new meal(s) if they don't exist
    for (const mealKey in meals) {
      if (meals[mealKey]) {
        mealDoc.meals[mealKey] = meals[mealKey];
      }
    }

    // Save the updated meal document
    await mealDoc.save();
    return res.status(200).json(mealDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get meals by user ID and date (ignoring time)
export const getMeals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const requestedDate = normalizeDate(req.params.date); // Normalize requested date

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
