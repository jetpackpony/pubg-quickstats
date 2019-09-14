import React from 'react';
import Match from './Match';
import styles from './User.module.css';
import moment from 'moment';
import Button from '../Button';
import Spinner from '../Spinner';

const groupMatchesPerDate = (matches) => {
  return matches.reduce((res, m) => {
    if (m.success) {
      const date = moment(m.matchData.attributes.createdAt).subtract(6, "hours").format("D MMMM YYYY");
      const thisDateObj = res.find((item) => item.date === date);
      if (thisDateObj) {
        thisDateObj.matches.push(m);
      } else {
        res.push({
          date,
          matches: [m]
        });
      }
    } else {
      if (res.length > 0) {
        res[res.length - 1].matches.push(m)
      } else {
        res.push({
          date: "",
          matches: [m]
        });
      }
    }
    return res;
  }, []);
};

const User = ({
  username,
  matches,
  loadMore,
  isLoading = false,
  isLastPage = false
}) => {
  const groupedMatches = groupMatchesPerDate(matches);
  return (
    <section className={styles.container}>
      <h1>{username}</h1>
      {
        groupedMatches.map(({ date, matches: ms }, i) => (
          <section key={i} className={styles.date}>
            <h2 className={styles.dateHeader}>{date}</h2>
            <ul className={styles.matchList}>
              {
                ms.map((m) => (
                  <li key={m.id}>
                    <Match match={m} />
                  </li>
                ))
              }
            </ul>
          </section>
        ))
      }
      <section className={styles.loadMore}>
        {
          (isLoading)
            ? <Spinner />
            : (!isLastPage)
              ? <Button onClick={loadMore}>Load More</Button>
              : null
        }
      </section>
    </section>
  );
};

export default User;