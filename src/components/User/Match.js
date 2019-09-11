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

const Match = ({ matchData }) => {
  const place = matchData.playerData.attributes.stats.winPlace;
  const st = [
    styles.match,
    (place <= 10 && place > 1)
      ? styles.top10
      : (place === 1)
          ? styles.winner
          : ""
  ].join(" ");
  return (
    <div className={st}>
      <div>
        {getMapName(matchData.attributes.mapName)}
      </div>
      <div>
        {moment(matchData.attributes.createdAt).fromNow()}
      </div>
      <div>
        {moment(matchData.attributes.createdAt).format("H:mm")}
      </div>

      <div className={styles.placeCell}>
        <span className={styles.label}>Place</span>
        <span className={styles.value}>
          {place}
        </span>
      </div>
      <div>
        <span className={styles.label}>Kill Place</span>
        <span className={styles.value}>
          {matchData.playerData.attributes.stats.killPlace}
        </span>
      </div>

      <div>
        <span className={styles.label}>Kills</span>
        <span className={styles.value}>
          {matchData.playerData.attributes.stats.kills}
        </span>
      </div>
      <div>
        <span className={styles.label}>Knocks</span>
        <span className={styles.value}>
          {matchData.playerData.attributes.stats.DBNOs}
        </span>
      </div>
      <div>
        <span className={styles.label}>Assists</span>
        <span className={styles.value}>
          {matchData.playerData.attributes.stats.assists}
        </span>
      </div>

      <div>
        <span className={styles.label}>Damage</span>
        <span className={styles.value}>
          {Math.round(matchData.playerData.attributes.stats.damageDealt)}
        </span>
      </div>
      <div>
        <span className={styles.label}>Headshot Kills</span>
        <span className={styles.value}>
          {matchData.playerData.attributes.stats.headshotKills}
        </span>
      </div>
      <div>
        <span className={styles.label}>Longest Kill</span>
        <span className={styles.value}>
          {Math.round(matchData.playerData.attributes.stats.longestKill)}
        </span>
      </div>
    </div>
  );
};

export default Match;