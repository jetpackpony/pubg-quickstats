const users = {
  "jetpackpony": { id: "account.ceb7f506c0034b9e844a72def363ccdb" },
  "Romanchello": { id: "account.7a918ec2edc846cb9ecb00ecd95a5d89" }
};
const getUser = (userName) => (
  (users[userName])
    ? users[userName]
    : null
);
module.exports = getUser;