const R = require('ramda');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const getUser = require('./getUser');
const { getPlayersMatches, getPluckedMatchData } = require('./pubgAPI');
const APIError = require('./APIError');
const PAGE_LIMIT = 20;

console.log(`Running with NODE_ENV=${process.env.NODE_ENV}`);

app.get("/users/:userName/matches", (req, res) => {
  res.set('Content-Type', 'application/vnd.api+json');
  const cursor = req.query.cursor || "";

  getUser(req.params.userName)
    .then((user) => {
      return getPlayersMatches(user.id)
        .then((matches) => {
          return R.pluck("id")(matches);
        })
        .then((ids) => {
          const cursorIndex = R.indexOf(cursor, ids);
          if (cursorIndex < 0) {
            return R.take(PAGE_LIMIT, ids);
          } else {
            return R.slice(cursorIndex + 1, cursorIndex + 1 + PAGE_LIMIT, ids);
          }
        })
        .then((ids) => {
          return Promise.all(
            ids.map((id) => getPluckedMatchData(id, user.id))
          );
        })
        .then((matches) => {
          const data = matches.map((m) => ({
            "type": "matches",
            "id": m.id,
            "attributes": {
              ...m.attributes,
              playerStats: m.playerData.attributes.stats
            }
          }));
          const lastMatch = matches[matches.length - 1];
          const lastId = lastMatch && lastMatch.id;
          const nextLink = (lastId) ? `${req.path}?cursor=${lastId}` : null;
          const links = {
            "next": nextLink
          };
          return { data, links };
        });
    })
    .then(({ data, links }) => {
      res.status(200);
      res.send({
        data,
        links,
        errors: []
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