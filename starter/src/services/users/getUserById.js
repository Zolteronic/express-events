import NotFoundError from "../../Errors/notFoundError.js";
import userData from "../../data/users.json" assert { type: "json" };

const getUserById = (id) => {
  const users = userData.users;
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new NotFoundError("User", id);
  }
  return user;
};

export default getUserById;
