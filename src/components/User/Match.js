import React from 'react';

const Match = ({ matchData }) => {
  return (
    <>
      <div>
        {matchData.attributes.createdAt}
      </div>
      <div>
        {matchData.attributes.mapName}
      </div>
      <div>
        Place: {matchData.playerData.attributes.stats.winPlace}
      </div>
      <div>
        Kills: {matchData.playerData.attributes.stats.kills}
      </div>
      <div>
        Headshot Kills: {matchData.playerData.attributes.stats.headshotKills}
      </div>
      <div>
        Kill Place: {matchData.playerData.attributes.stats.killPlace}
      </div>
      <div>
        Knocks: {matchData.playerData.attributes.stats.DBNOs}
      </div>
      <div>
        Assists: {matchData.playerData.attributes.stats.assists}
      </div>
      <div>
        Damage: {Math.round(matchData.playerData.attributes.stats.damageDealt)}
      </div>
      <div>
        Longest Kill: {Math.round(matchData.playerData.attributes.stats.longestKill)} m
      </div>
    </>
  );
};

export default Match;