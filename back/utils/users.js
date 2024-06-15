const activeUsers = [];

const pushActiveUsers = (id, username) => {
  const userExists = activeUsers.find((user) => user.username === username);

  if (!userExists) {
    const activeUser = {
      id,
      username,
    };
    activeUsers.push(activeUser);
  }
  return activeUsers;
};

const removeUsers = (username) => {
  const index = activeUsers.findIndex((user) => user.username == username);
  if (index !== -1) {
    activeUsers.splice(index, 1);
    return activeUsers;
  }
};

module.exports = { activeUsers, pushActiveUsers, removeUsers };
