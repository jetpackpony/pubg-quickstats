import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Match from './Match';
import testMatchesData from './getMatchData-plucked.json';

storiesOf('Match', module)
  .add('successful load', () => (
    <Match matchData={testMatchesData[1].matchData} />
  ))
  .add('top 10', () => (
    <Match matchData={testMatchesData[2].matchData} />
  ))
  .add('chicken dinner', () => (
    <Match matchData={testMatchesData[3].matchData} />
  ))
  .add('failed to load', () => (
    <Match matchData={testMatchesData[4].matchData} />
  ))