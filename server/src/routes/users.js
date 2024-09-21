// src/routes/users.js
import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
