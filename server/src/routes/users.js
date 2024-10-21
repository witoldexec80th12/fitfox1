// src/routes/users.js
import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  updateUserInfo,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/user-info/:id", updateUserInfo);
router.delete("/:id", deleteUser);

export default router;
