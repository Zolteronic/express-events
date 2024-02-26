import userData from "../../data/users.json" assert { type: "json" };

const getUsers = (name, username) => {
  let users = userData.users;
  if (name) {
    users = users.filter((user) => user.name.includes(name));
  }
  if (username) {
    users = users.filter((user) => user.username.includes(username));
  }
  return users;
};

export default getUsers;
