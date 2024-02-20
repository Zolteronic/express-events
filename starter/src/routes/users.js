import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import getUserById from "../services/users/getUserById.js";
import notFoundHandler from "../middleware/notFoundHandler.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";

const router = Router();

router.get("/", (req, res) => {
  const usersData = getUsers();
  res.json(usersData);
});

router.post("/", authMiddleware, (req, res) => {
  const { username, password, name, image } = req.body;
  const newUser = createUser(username, password, name, image);
  res.status(201).json({ user: newUser, message: "User created" });
});

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);
    res.status(200).json({ user: user, message: "succesfully User found." });
  },
  notFoundHandler
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updatedUser = updateUserById(id, username, password, name, image);
    res.status(200).json({ user: updatedUser, message: "User updated" });
  },
  notFoundHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedUser = deleteUser(id);
    res.status(200).json({ user: deletedUser, message: "User deleted" });
  },
  notFoundHandler
);

export default router;
