// src/controllers/userController.js
import User from "../models/User.js";
import AccessCode from "../models/AccessCode.js";
import { validateCode } from "../utils/accessCode.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ tgId: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatingUser = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { tgId: id },
      { $set: updatingUser }, // Use $set to update only the fields that need to be changed
      { new: true, lean: true } // new: true returns the updated document, lean: true returns a plain object
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User Info
export const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  console.log("access code: ", userInfo);

  try {
    const user = await User.findOne({ tgId: id });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (userInfo.accessCode) {
      const validation = await validateCode(userInfo.accessCode, id);
      if (!validation.success) {
        return res
          .status(validation.status)
          .json({ error: validation.message });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { tgId: id },
      {
        $set: {
          "userInfo.tgGroupId": userInfo.tgGroupId || user.userInfo.tgGroupId,
          "userInfo.stepnId": userInfo.stepnId || user.userInfo.stepnId,
          "userInfo.stepnPassword": userInfo.stepnPassword || user.userInfo.stepnPassword,
          "userInfo.labData": userInfo.labData || user.userInfo.labData,
          "userInfo.accessCode": userInfo.accessCode || user.userInfo.accessCode,
        }
      },
      { new: true, useFindAndModify: false } // Return updated document and avoid deprecated method
    );

    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
