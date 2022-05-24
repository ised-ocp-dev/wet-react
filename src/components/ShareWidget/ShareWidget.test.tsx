import React from 'react';
import { render } from '@testing-library/react';

import ShareWidget from '@components/ShareWidget';

describe('ShareWidget Tests', () => {
  describe('ShareWidget Filter', () => {
    test('Default ShareWidget filter', () => {
      const result = render(
        <ShareWidget
          shareLinkText="Share this page"
          modalTitle="Share this page"
          show
        />
      );

      expect(result).toBeTruthy();
    });
  });
});
