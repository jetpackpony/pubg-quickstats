import React from 'react';
import styles from './Match.module.css';
import moment from 'moment';

const mapNames = {
  "Desert_Main": "Miramar",
  "DihorOtok_Main": "Vikendi",
  "Erangel_Main": "Erangel",
  "Baltic_Main": "Erangel",
  "Range_Main": "Camp Jackal",
  "Savage_Main": "Sanhok"
};
const getMapName = (id) => mapNames[id];
const replaceZeros = (val) => (val > 0) ? val : (<span className={styles.zeroValue}>-</span>);

const Match = ({ match: { success, id, matchData } }) => {
  if (!success) {
    return (
      <div className={[styles.box, styles.failed].join(" ")}>
        Failed to load: {id}
      </div>
    );
  }
  const {
    winPlace: place, killPlace,
    kills, DBNOs, assists,
    damageDealt, headshotKills, longestKill
  } = matchData.playerData.attributes.stats;
  const st = [
    styles.box,
    styles.match,
    (killPlace <= 5)
      ? styles.killTop5
      : (place <= 10 && place > 1)
        ? styles.top10
        : (place === 1)
          ? styles.winner
          : ""
  ].join(" ");
  return (
    <div className={st}>
      <div className={styles.mapCell}>
        {getMapName(matchData.attributes.mapName)}
      </div>
      <div>
        {moment(matchData.attributes.createdAt).format("H:mm")}
      </div>

      <div className={styles.placeCell}>
        <span className={styles.label}>Place</span>
        <span className={[styles.value, styles.placeValue].join(" ")}>
          {place}
        </span>
      </div>
      <div>
        <span className={styles.label}>Kill Place</span>
        <span className={[styles.value, styles.killPlaceValue].join(" ")}>
          {killPlace}
        </span>
      </div>

      <div>
        <span className={styles.label}>Kills</span>
        <span className={styles.value}>
          {replaceZeros(kills)}
        </span>
      </div>
      <div>
        <span className={styles.label}>Knocks</span>
        <span className={styles.value}>
          {replaceZeros(DBNOs)}
        </span>
      </div>
      <div>
        <span className={styles.label}>Assists</span>
        <span className={styles.value}>
          {replaceZeros(assists)}
        </span>
      </div>

      <div>
        <span className={styles.label}>Damage</span>
        <span className={styles.value}>
          {replaceZeros(Math.round(damageDealt))}
        </span>
      </div>
      <div>
        <span className={styles.label}>Headshot Kills</span>
        <span className={styles.value}>
          {replaceZeros(headshotKills)}
        </span>
      </div>
      <div>
        <span className={styles.label}>Longest Kill</span>
        <span className={styles.value}>
          {replaceZeros(Math.round(longestKill))}
        </span>
      </div>
    </div>
  );
};

export default Match;