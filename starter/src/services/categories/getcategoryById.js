import categorieData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../Errors/notFoundError.js";

const getCategoryById = (id) => {
  const categorie = categorieData.categories;
  const category = categorie.find((category) => category.id === id);

  if (!category) {
    throw new NotFoundError("category", id);
  }

  return [category];
};

export default getCategoryById;
