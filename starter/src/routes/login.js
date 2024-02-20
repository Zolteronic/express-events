import "dotenv/config";
import jwt from "jsonwebtoken";
import { Router } from "express";
import userData from "../data/users.json" assert { type: "json" };

const router = Router();

router.post("/", (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY;
  const { username, password } = req.body;
  const { users } = userData;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Login successful", token });
});

export default router;
