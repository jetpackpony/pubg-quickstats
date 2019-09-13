const users = {
  "jetpackpony": { id: "account.ceb7f506c0034b9e844a72def363ccdb" },
  "Romanchello": { id: "account.7a918ec2edc846cb9ecb00ecd95a5d89" }
};
const getUser = (userName) => (
  new Promise((resolve, reject) => {
    (users[userName])
      ? resolve(users[userName])
      : reject({
        status: 404,
        title: `Can't find user with username '${userName}'`
      })
  })
);
module.exports = getUser;