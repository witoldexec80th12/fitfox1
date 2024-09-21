// src/routes/meals.js
import express from "express";
import { addMealPhotos, getMeals } from "../controllers/mealController.js";

const router = express.Router();

router.post("/", addMealPhotos);
router.get("/:userId/:date", getMeals);

export default router;
