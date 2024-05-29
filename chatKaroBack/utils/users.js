const allLoggedinUsers = [];

const joinLoggedinUser = (id, username) => {
  const user = {
    id,
    username,
  };
  allLoggedinUsers.push(user);
  return user;
};

const getCurrentUser = (id) => {
  const currentUser = allLoggedinUsers.find((user) => user.id === id);
  return currentUser.username;
};

module.exports = { joinLoggedinUser, getCurrentUser };
