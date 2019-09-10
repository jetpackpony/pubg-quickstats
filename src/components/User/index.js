import React, { useState } from 'react';
import * as R from 'ramda';
import getUser from '../../api/getUser';
import { getPlayerData, getMatchData, pluckMatchData } from '../../api/pubgAPI';
import testPlayerData from './getPlayerData-test-data.json';
import testMatchesData from './getMatchData-plucked.json';

const UserContainer = ({ match: { params: { username}}}) => {
  const [matchIds, setMatchIds] = useState([]);
  const [matches, setMatches] = useState([]);
  const user = getUser(username);
  if (!user) {
    return <div>No user fround for "{username}"</div>
  }
  if (matchIds.length === 0) {
    if (process.env.NODE_ENV === "production") {
      getPlayerData(user.id)
        .then((res) => {
          setMatchIds(R.take(20, res.data.relationships.matches.data));
        });
    } else {
      setTimeout(() => setMatchIds(R.take(20, testPlayerData.data.relationships.matches.data)), 0);
    }
  }

  if (matchIds.length > 0 && matches.length === 0) {
    ((process.env.NODE_ENV === "production")
      ? Promise.all(
        R.pluck("id", matchIds).map(async (id) => {
          const res = await getMatchData(id);
          return {
            success: (res) ? true : false,
            id,
            matchData: (res) ? pluckMatchData(res, user.id) : null
          };
        })
      )
      : Promise.resolve(testMatchesData)
    )
    .then((res) => {
      setMatches(res);
    })
  }

  return (
    <User
      username={username}
      matches={matches}
    />
  );
};

const User = ({
  username,
  matches
}) => {
  console.log(matches);
  return (
    <>
      <h1>{username}</h1>
      <ul>
        {
          matches.map((m) => (
            <li key={m.id}>
              {
                (m.success)
                  ? (
                    <>
                    <div>
                      {m.matchData.attributes.createdAt}
                    </div>
                    <div>
                      {m.matchData.attributes.mapName}
                    </div>
                    <div>
                      Place: {m.matchData.playerData.attributes.stats.winPlace}
                    </div>
                    <div>
                      Kills: {m.matchData.playerData.attributes.stats.kills}
                    </div>
                    <div>
                      Headshot Kills: {m.matchData.playerData.attributes.stats.headshotKills}
                    </div>
                    <div>
                      Kill Place: {m.matchData.playerData.attributes.stats.killPlace}
                    </div>
                    <div>
                      Knocks: {m.matchData.playerData.attributes.stats.DBNOs}
                    </div>
                    <div>
                      Assists: {m.matchData.playerData.attributes.stats.assists}
                    </div>
                    <div>
                      Damage: {Math.round(m.matchData.playerData.attributes.stats.damageDealt)}
                    </div>
                    <div>
                      Longest Kill: {Math.round(m.matchData.playerData.attributes.stats.longestKill)} m
                    </div>
                    </>
                  )
                  : (
                    <div>Failed to load: {m.id}</div>
                  )
              }
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default UserContainer;