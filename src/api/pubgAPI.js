import * as R from 'ramda';

const API_ENDPOINT = "https://api.pubg.com/shards/steam";
const MATCHES_ENDPOINT = `https://cors-anywhere.herokuapp.com/${API_ENDPOINT}/matches`;
const PLAYERS_ENDPOINT = `${API_ENDPOINT}/players`;
const PUBG_API_KEY = process.env.REACT_APP_PUBG_API_KEY;

export const getMatchData = (matchId) => {
  return fetch(`${MATCHES_ENDPOINT}/${matchId}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json"
    }
  })
    .then((data) => data.json())
    .catch((err) => { console.log("Fetch ERROR: " + err); return null; });
};

export const getPlayerData = (playerID) => {
  return fetch(`${PLAYERS_ENDPOINT}/${playerID}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json",
      "Authorization": `Bearer ${PUBG_API_KEY}`
    }
  })
    .then((data) => data.json())
    .catch((err) => console.log("ERROR: " + err));
};

export const getPlayersMatches = (playerID) => {
  return getPlayerData(playerID)
    .then((json) => json.data.relationships.matches.data)
};

export const pluckMatchData = (matchData, playerID) => {
  const res = {
    id: matchData.data.id,
    attributes: matchData.data.attributes,
    playerData: R.find((p) => {
      return p.type === "participant" && p.attributes.stats.playerId === playerID;
    }, matchData.included)
  };
  return res;
};