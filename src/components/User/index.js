import React from 'react';

const User = ({ match: { params: { username}}}) => {
  return (
    <h1>{username}</h1>
  );
};

export default User;