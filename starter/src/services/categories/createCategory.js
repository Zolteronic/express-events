import categoryData from "../../data/categories.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

const createCategory = (name, id) => {
  const categories = categoryData.categories;

  const newCategory = {
    name,
    id: uuid(),
  };

  categories.push(newCategory);

  return newCategory;
};

export default createCategory;
