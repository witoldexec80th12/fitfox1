import mongoose from "mongoose";

const accessCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    usedDate: { type: Date },
    userId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("AccessCode", accessCodeSchema);
