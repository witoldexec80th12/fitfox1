// src/models/User.js
import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    tgGroupId: { type: String, default: "" },
    stepnId: { type: String, default: "" },
    stepnPassword: { type: String, default: "" },
    labData: { type: String, default: "" },
    accessCode: { type: String, default: "" },
    labDataChecked: { type: Boolean, default: false },
  },
  { _id: false } // Prevent _id for userInfo subdocument
);

// Define a schema for each task with subscriptionDate and lastUpdated fields
const taskSchema = new mongoose.Schema(
  {
    subscriptionDate: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { _id: false } // Prevent _id for task subdocuments
);

const userSchema = new mongoose.Schema(
  {
    tgId: { type: String, required: true, unique: true }, // Custom tgId field
    username: { type: String, default: "" },
    first_name: { type: String, required: true },
    last_name: { type: String, default: "" },
    email: { type: String, unique: true },
    avatar: { type: String, default: "" }, // URL to avatar image
    point: { type: Number, default: 0 },
    userInfo: { type: userInfoSchema, default: {} },
    tasks: {
      breakfast: { type: taskSchema, default: { subscriptionDate: 0 } },
      lunch: { type: taskSchema, default: { subscriptionDate: 0 } },
      dinner: { type: taskSchema, default: { subscriptionDate: 0 } },
      walking: { type: taskSchema, default: { subscriptionDate: 0 } },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);
