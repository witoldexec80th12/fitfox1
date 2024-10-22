// src/server.js
import express from "express";
import cors from "cors"; 
import connectDB from "./config/config.js";
import usersRoute from "./routes/users.js";
import mealsRoute from "./routes/meals.js";
import { addMail } from "./controllers/mailController.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use CORS middleware

app.use(express.json());
connectDB();

app.use("/api/users", usersRoute);
app.use("/api/meals", mealsRoute);
app.post("/api/mails", addMail);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
