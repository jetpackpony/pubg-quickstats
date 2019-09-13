import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Match from './Match';
import testMatchesData from './test-matches.json';

storiesOf('Match', module)
  .add('successful load', () => (
    <Match match={testMatchesData[0]} />
  ))
  .add('top 10', () => (
    <Match match={testMatchesData[2]} />
  ))
  .add('chicken dinner', () => (
    <Match match={testMatchesData[3]} />
  ))
  .add('kill top 5', () => (
    <Match match={testMatchesData[1]} />
  ))
  .add('failed to load', () => (
    <Match match={testMatchesData[4]} />
  ))