import getCategories from "../services/categories/getCategories.js";
import { Router } from "express";
import getCategoryById from "../services/categories/getcategoryById.js";
import createCategory from "../services/categories/createCategory.js";
import deleteCategory from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import notFoundHandler from "../middleware/notFoundHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  const categories = getCategories();
  res.status(200).json(categories);
});

router.get(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const category = getCategoryById(id);

    res.status(200).json({
      categories: category,
      message: "Category successfully extracted",
    });
  },
  notFoundHandler
);

router.post(
  "/",
  authMiddleware,
  (req, res) => {
    const { name } = req.body;
    const category = createCategory(name);
    res.status(201).json(category);
  },
  notFoundHandler
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = updateCategoryById(id, name);
    res.status(200).json({ category: category, message: "Category updated" });
  },
  notFoundHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const category = deleteCategory(id);
    res.status(200).json({ category: category, message: "Category deleted" });
  },
  notFoundHandler
);

export default router;
