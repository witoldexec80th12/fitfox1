// src/models/User.js
import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    tgGroupId: { type: String, default: "" },
    stepnId: { type: String, default: "" },
    stepnPassword: { type: String, default: "" },
    labData: { type: String, default: "" },
    accessCode: { type: String, default: "" },
    labDataChecked: {type: Boolean, default: false},
  },
  { _id: false }
); // Prevent _id for userInfo subdocument

const userSchema = new mongoose.Schema(
  {
    tgId: { type: String, required: true, unique: true }, // Custom tgId field
    username: { type: String, default: ""},
    first_name: { type: String, required: true },
    last_name: { type: String, default: "" },
    email: { type: String, unique: true },
    avatar: { type: String, default: "" }, // URL to avatar image
    point: { type: Number, default: 0 },
    userInfo: { type: userInfoSchema, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);
