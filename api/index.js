const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const getUser = require('./getUser');
const { getPlayersMatches } = require('./pubgAPI');
const APIError = require('./APIError');

console.log(`Running with NODE_ENV=${process.env.NODE_ENV}`);

app.get("/users/:userName/matches", (req, res) => {
  res.set('Content-Type', 'application/vnd.api+json');

  getUser(req.params.userName)
    .then((user) => {
      return getPlayersMatches(user.id);
    })
    .then((matches) => {
      res.status(200);
      res.send({
        data: matches,
        errors: [],
        links: {}
      });
    })
    .catch((err) => {
      let error = err;
      if (error.name !== "APIError") {
        error = new APIError({
          status: 500,
          title: `Got and API error: ${err}`
        });
      }
      res.status(error.data.status);
      res.send({
        data: [],
        errors: [error.data],
        links: {}
      });
    });

    // const cursor = req.query.cursor || "";
    // const { data, links }
    // data = [
    //   {
    //     "type": "matches",
    //     "id": "kjj3i20-kjfwe-ksdfwn3-k23j23n",
    //     "attributes": {

    //     }
    //   },
    //   {
    //     "type": "matches",
    //     "id": "kjj3i20-kjfwe-ksdfwn3-k23j23n",
    //     "attributes": {

    //     }
    //   }
    // ];
    // links = {
    //   "self": "",
    //   "next": ""
    // };
    // res.send({
    //   data,
    //   errors,
    //   links
    // });

});

app.listen(port, () => console.log(`Listening on port ${port}`));