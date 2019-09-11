import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Match from './Match';
import testMatchesData from './getMatchData-plucked.json';

storiesOf('Match', module)
  .add('successful load', () => (
    <Match matchData={testMatchesData[1].matchData} />
  ));
