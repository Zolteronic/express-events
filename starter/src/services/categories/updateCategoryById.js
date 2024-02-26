import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../Errors/notFoundError.js";

const updateCategoryById = (id, name) => {
  if (!id) {
    throw new NotFoundError("category", id);
  }
  const categories = categoryData.categories;
  const category = categories.find((category) => category.id === id);

  if (!category) {
    throw new NotFoundError("category", id);
  }

  category.name = name ?? category.name;

  return categories;
};

export default updateCategoryById;
