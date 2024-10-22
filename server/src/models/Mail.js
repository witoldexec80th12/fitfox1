import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { 
      type: String, 
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    date: { type: Date, default: Date.now },
  });

export default mongoose.model("Mail", mailSchema);
