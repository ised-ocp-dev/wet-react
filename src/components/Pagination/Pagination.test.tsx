import React from 'react';
import { render, screen } from '@testing-library/react';

import Pagination from '@components/Pagination';

describe('Pagination tests', () => {
  const placeholder = 'PlaceHolder Text';
  describe('Test Pagination sizes', () => {
    test('Renders default size', () => {
      render(
        <Pagination>
          <Pagination.Button>{placeholder}</Pagination.Button>
        </Pagination>
      );
    });
    test('Renders large size', () => {
      render(
        <Pagination size="lg">
          {placeholder}
          <Pagination.Button />
        </Pagination>
      );
      expect(screen.getByText(placeholder)).toHaveClass('pagination-lg');
    });
    test('Renders small size', () => {
      render(
        <Pagination size="sm">
          {placeholder}
          <Pagination.Button />
        </Pagination>
      );
      expect(screen.getByText(placeholder)).toHaveClass('pagination-sm');
    });
  });
  describe('Testing PaginationButton activities ', () => {
    test('Test active', () => {
      render(
        <Pagination>
          <Pagination.Button value="prev" />
          <Pagination.Button active value="1">
            {placeholder}
          </Pagination.Button>
        </Pagination>
      );
      expect(screen.getByText(placeholder).parentNode).toHaveClass('active');
    });
    test('Test disabled', () => {
      render(
        <Pagination>
          {placeholder}
          <Pagination.Button disabled value="next" />
          <Pagination.Button value="1" />
        </Pagination>
      );
      expect(screen.getByText(placeholder).childNodes[1]).toHaveClass(
        'disabled'
      );
    });
  });
});
