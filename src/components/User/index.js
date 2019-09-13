import React, { useState } from 'react';
import User from './User';
import { getPage } from '../../api/api';

const UserContainer = ({ match: { params: { username}}}) => {
  const [nextLink, setNextLink] = useState("");
  const [matches, setMatches] = useState([]);

  if (matches.length === 0) {
    getPage(username, nextLink)
      .then((res) => {
        if (res.errors.length > 0) {
          console.log("Error while making a request", res.errors);
        } else {
          const matches = res.data.map((m) => ({
            success: true,
            id: m.id,
            matchData: m
          }));
          console.log("Mathces:", matches);
          console.log("Next link:", res.links.next);
          setMatches(matches);
          setNextLink(res.links.next);
        }
      });
  }

  return (
    <User
      username={username}
      matches={matches}
    />
  );
};

export default UserContainer;