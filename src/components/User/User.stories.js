import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import User from './User';
import testMatchesData from './getMatchData-plucked.json';

storiesOf('User', module)
  .add('normal', () => (
    <User username="testme" matches={testMatchesData} />
  ))