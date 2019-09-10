import React, { useState } from 'react';
import getUser from '../../api/getUser';
import { getPlayerData } from '../../api/pubgAPI';

const UserContainer = ({ match: { params: { username}}}) => {
  const [matches, setMatches] = useState([]);
  const user = getUser(username);
  if (!user) {
    return <div>No user fround for "{username}"</div>
  }
  if (matches.length === 0) {
    getPlayerData(user.id)
      .then((res) => {
        setMatches(res.data.relationships.matches.data);
      });
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
  return (
    <>
      <h1>{username}</h1>
      <ul>
        {
          matches.map((m) => (
            <li key={m.id}>{m.id}</li>
          ))
        }
      </ul>
    </>
  );
};

export default UserContainer;