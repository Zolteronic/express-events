import categoryData from "../../data/categories.json" assert { type: "json" };

const deleteCategory = (id) => {
  const categories = categoryData.categories;
  const category = categories.findIndex((category) => category.id === id);

  if (category === -1) {
    throw new NotFoundError("category", id);
  }

  categories.splice(category, 1);
  return id;
};

export default deleteCategory;
