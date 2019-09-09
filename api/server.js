const express = require('express');
const app = express();
const port = 5000;
const getUser = require("./getUser");

app.get('/users/:userName', (req, res) => {
  const { id: userId } = getUser(req.params.userName);
  res.json({ userName: req.params.userName, userId, matches: [1, 2, 3] });
});

app.listen(port, () => console.log(`Listening on a port ${port}`));