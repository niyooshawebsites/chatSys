const activeUsers = [];

const pushActiveUsers = (id, username) => {
  const userExists = activeUsers.find((user) => user.id === id);

  if (!userExists) {
    const activeUser = {
      id,
      username,
    };
    activeUsers.push(activeUser);
  }
  return activeUsers;
};

module.exports = { activeUsers, pushActiveUsers };
