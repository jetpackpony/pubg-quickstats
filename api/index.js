const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get("/users/:userName/matches", (req, res) => {
  res.send(`Testme`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));