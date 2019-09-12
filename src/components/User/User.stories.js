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
  .add('first failed', () => (
    <User username="testme" matches={[
      {
        "success": false,
        "id": "d6d64e5e302c-d6d64e5e302c-d6d64e5e302c"
      },
      ...testMatchesData
    ]} />
  ))