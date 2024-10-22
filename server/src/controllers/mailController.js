import Mail from "../models/Mail.js";

export const addMail = async (req, res) => {
  const { userId, email } = req.body;
  console.log("userId and email: ", userId, email);

  try {
    const mail = await Mail.findOne({ userId });

    if (mail) {
      res.status(401).json({ error: "user already joined" });
    } else {
      const newMail = new Mail({
        userId,
        email,
      });
      await newMail.save();
      res.status(201).json({message: "Mail successfully joined"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
