import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../Errors/notFoundError.js";

const deleteUser = (id) => {
  const users = userData.users;
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundError("User", id);
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return user;
};
export default deleteUser;
