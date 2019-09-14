import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import User from './User';
import testMatchesData from './test-matches.json';

storiesOf('User', module)
  .add('normal', () => (
    <User
      username="testme"
      matches={testMatchesData}
      loadMore={action("loadMore")}
    />
  ))
  .add('first failed', () => (
    <User
      username="testme"
      matches={[
        {
          "success": false,
          "id": "d6d64e5e302c-d6d64e5e302c-d6d64e5e302c"
        },
        ...testMatchesData
      ]}
      loadMore={action("loadMore")}
    />
  ))
  .add('is loading empty', () => (
    <User
      username="testme"
      matches={[]}
      loadMore={action("loadMore")}
      isLoading={true}
    />
  ))
  .add('is loading with matches', () => (
    <User
      username="testme"
      matches={testMatchesData}
      loadMore={action("loadMore")}
      isLoading={true}
    />
  ))
  .add('last page, no more matches', () => (
    <User
      username="testme"
      matches={testMatchesData}
      loadMore={action("loadMore")}
      isLoading={false}
      isLastPage={true}
    />
  ))