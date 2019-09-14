import React from 'react';
import Match from './Match';
import styles from './User.module.css';
import matchStyles from './Match.module.css';
import moment from 'moment';
import Button from '../Button';
import Spinner from '../Spinner';
import { replaceZeros } from './Match';

const calcTotals = (matches) => {
  const totals = matches.filter((m) => m.success).reduce(
    (res, { matchData: { attributes: { playerStats: {
      winPlace, kills, DBNOs, assists
    } } } }) => ({
      wins: res.wins + ((winPlace === 1) ? 1 : 0),
      totalMatches: res.totalMatches + 1,
      kills: res.kills + kills,
      knocks: res.knocks + DBNOs,
      assists: res.assists + assists,
    }), {
    wins: 0,
    totalMatches: 0,
    kills: 0,
    knocks: 0,
    assists: 0,
  });
  const deaths = totals.totalMatches - totals.wins;
  return {
    ...totals,
    kd: Math.round(totals.kills / deaths * 100) / 100,
    kkad: Math.round((totals.kills + totals.knocks + totals.assists) / deaths * 100) / 100
  };
};

const groupMatchesPerDate = (matches) => {
  const grouped = matches.reduce((res, m) => {
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
  const withTotals = grouped.map((g) => {
    return {
      ...g,
      totals: calcTotals(g.matches)
    };
  });
  return withTotals;
};

const User = ({
  username,
  matches,
  loadMore,
  isLoading = false,
  isLastPage = false
}) => {
  const groupedMatches = groupMatchesPerDate(matches);
  console.log("Grouped matches: ", groupedMatches);
  const isLastGroup = (i) => (i === groupedMatches.length - 1);
  return (
    <section className={styles.container}>
      <h1>{username}</h1>
      {
        groupedMatches.map(({ date, matches: ms, totals }, i) => (
          <section key={i} className={styles.date}>
            <header className={styles.dateHeader}>
              <section>
                <h2>{date}</h2>
                {
                  (!isLastGroup(i))
                    ? <div>{totals.totalMatches} matches</div>
                    : null
                }
              </section>
              {
                (isLastGroup(i) && !isLastPage)
                  ? <section>To calculate stats click Load More button</section>
                  : (
                    <section className={styles.dateStats}>
                      <div className={matchStyles.label}>Kills</div>
                      <div className={matchStyles.label}>Knocks</div>
                      <div className={matchStyles.label}>Assists</div>
                      <div className={matchStyles.label}>K/D</div>
                      <div className={matchStyles.label}>KKA/D</div>
                      <div className={matchStyles.value}>{replaceZeros(totals.kills)}</div>
                      <div className={matchStyles.value}>{replaceZeros(totals.knocks)}</div>
                      <div className={matchStyles.value}>{replaceZeros(totals.assists)}</div>
                      <div className={matchStyles.value}>{replaceZeros(totals.kd)}</div>
                      <div className={matchStyles.value}>{replaceZeros(totals.kkad)}</div>
                    </section>
                  )
              }
            </header>
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