// src/routes/meals.js
import express from "express";
import { addMealPhotos, getMealsByIDDate } from "../controllers/mealController.js";

const router = express.Router();

router.post("/", addMealPhotos);
router.get("/:userId/:date", getMealsByIDDate);

export default router;
