import React from 'react';
import { render, screen } from '@testing-library/react';

import Archived from '@components/Archived';

describe('Archived', () => {
  const ArchivedContent = 'Hello world!';
  test('renders default english Archived component', () => {
    render(<Archived />);
    expect(
      screen.getByText('This page has been archived on the Web')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This page has been archived on the Web').parentNode
    ).toHaveClass('alert alert-warning wb-inview');
  });
  test('renders default french Archived component', () => {
    render(<Archived french />);
    expect(
      screen.getByText('Cette page Web a été archivée dans le Web')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Cette page Web a été archivée dans le Web').parentNode
    ).toHaveClass('alert alert-warning wb-inview');
  });

  test('renders default english Archived component with optional link', () => {
    render(
      <Archived>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });

  test('renders default french Archived component with optional link', () => {
    render(
      <Archived french>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });
});
