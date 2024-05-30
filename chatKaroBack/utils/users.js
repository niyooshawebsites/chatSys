const allLoggedinUsers = [];

const joinLoggedinUser = (id, username, text) => {
  const user = {
    id,
    username,
    text,
  };
  allLoggedinUsers.push(user);
  return user;
};

const getCurrentUser = (id) => {
  const currentUser = allLoggedinUsers.find((user) => user.id === id);
  return currentUser;
};

module.exports = { joinLoggedinUser, getCurrentUser };
