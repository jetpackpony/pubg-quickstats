import React, { useState } from 'react';
import User from './User';
import { getPage } from '../../api/api';

const UserContainer = ({ match: { params: { username}}}) => {
  const [nextLink, setNextLink] = useState("");
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isLastPage = () => nextLink === null;

  const loadMore = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getPage(username, nextLink)
      .then((res) => {
        if (res.errors.length > 0) {
          console.log("Error while making a request", res.errors);
        } else {
          const newMatches = res.data.map((m) => ({
            success: true,
            id: m.id,
            matchData: m
          }));
          console.log("New Matches:", newMatches);
          console.log("Next link:", res.links.next);
          setMatches(matches.concat(newMatches));
          setNextLink(res.links.next);
          setIsLoading(false);
        }
      });
  };

  if (matches.length === 0 && !isLoading) {
    loadMore();
  }

  return (
    <User
      username={username}
      matches={matches}
      loadMore={loadMore}
      isLoading={isLoading}
      isLastPage={isLastPage()}
    />
  );
};

export default UserContainer;