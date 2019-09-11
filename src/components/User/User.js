import React from 'react';
import Match from './Match';
import styles from './User.module.css';

const User = ({
  username,
  matches
}) => {
  console.log(matches);
  return (
    <>
      <h1>{username}</h1>
      <ul className={styles.matchList}>
        {
          matches.map((m) => (
            <li key={m.id}>
              {
                (m.success)
                  ? (
                    <Match matchData={m.matchData} />
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

export default User;