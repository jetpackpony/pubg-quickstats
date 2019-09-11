import React, { useState } from 'react';
import * as R from 'ramda';
import getUser from '../../api/getUser';
import { getPlayerData, getMatchData, pluckMatchData } from '../../api/pubgAPI';
import testPlayerData from './getPlayerData-test-data.json';
import testMatchesData from './getMatchData-plucked.json';
import User from './User';

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

export default UserContainer;