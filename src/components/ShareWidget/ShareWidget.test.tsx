import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

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

      expect(
        result.container.querySelectorAll('.btn-lg .btn .btn-default')
      ).toHaveLength(0);
    });
    test('Default ShareWidget filter', () => {
      const result = render(
        <ShareWidget
          shareLinkText="Share this page"
          modalTitle="Share this page"
          url="http://example.com"
          filter={[
            'Email',
            'Facebook',
            'Blogger',
            'LinkedIn',
            'Pinterest',
            'reddit',
            'tumblr',
            'WhatsApp',
            'Yahoo Mail',
            'Twitter',
          ]}
          show
        />
      );

      expect(
        result.container.querySelectorAll('.btn-lg .btn .btn-default')
      ).toHaveLength(10);
    });
  });
});
