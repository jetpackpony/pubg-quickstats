const R = require('ramda');
const fetch = require('node-fetch');
const API_ENDPOINT = "https://api.pubg.com/shards/steam";
const MATCHES_ENDPOINT = `${API_ENDPOINT}/matches`;
const PLAYERS_ENDPOINT = `${API_ENDPOINT}/players`;
const APIError = require('./APIError');
const useDummyData = process.env.NODE_ENV !== "production" && true;
const testMatches = require('./test-match-list.json');
const testMatchData = require('./test-matches-data.json');

if (useDummyData) console.log("Using dummy data for the API");
else console.log("Using the real API");

const getMatchData = (matchId) => {
  return fetch(`${MATCHES_ENDPOINT}/${matchId}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json"
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new APIError({
          status: res.status,
          title: `Couldn't retrieve match data from PUBG API.
            Trying to retrieve: ${res.url}
            Got statusText: \n ${res.statusText}`
        });
      }
      return res;
    })
    .then((data) => data.json())
};

const getPlayerData = (playerID) => {
  return fetch(`${PLAYERS_ENDPOINT}/${playerID}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json",
      "Authorization": `Bearer ${process.env.PUBG_API_KEY}`
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new APIError({
          status: 500,
          title: `Couldn't retrieve user's data from PUBG API.
            Trying to retrieve: ${res.url}
            Got statusText: \n ${res.statusText}`
        });
      }
      return res;
    })
    .then((data) => data.json());
};

const getPlayersMatches = (playerID) => {
  return (useDummyData)
    ? Promise.resolve(testMatches)
    : getPlayerData(playerID)
      .then((json) => json.data.relationships.matches.data)
};

const pluckMatchData = (matchData, playerID) => {
  return Promise.resolve({
    id: matchData.data.id,
    attributes: matchData.data.attributes,
    playerData: R.find((p) => {
      return p.type === "participant" && p.attributes.stats.playerId === playerID;
    }, matchData.included)
  });
};

const getPluckedMatchData = async (matchId, playerID) => {
  if (useDummyData) {
    const res = testMatchData[matchId];
    if (!res) {
      throw new APIError({
        status: 404,
        title: `Couldn't load match data for: ${matchId}`
      });
    }
    return res;
  }
  return pluckMatchData(await getMatchData(matchId), playerID);
};

module.exports = {
  getMatchData,
  getPlayerData,
  getPlayersMatches,
  getPluckedMatchData
};