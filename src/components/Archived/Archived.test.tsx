import React from 'react';
import { render, screen } from '@testing-library/react';

import Archived from '@components/Archived';

describe('Archived', () => {
  const ArchivedContent = 'Hello world!';
  const ArchivedAdditionalContent = 'addon content';
  test('renders default english Archived component', () => {
    render(
      <Archived content="">
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });
  test('renders default french Archived component', () => {
    render(
      <Archived content="" french>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });

  test('renders default english Archived component with optional link', () => {
    render(
      <Archived content={ArchivedAdditionalContent}>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
    expect(screen.getByText(ArchivedAdditionalContent)).toBeInTheDocument();
  });

  test('renders default french Archived component with optional link', () => {
    render(
      <Archived content={ArchivedAdditionalContent} french>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
    expect(screen.getByText(ArchivedAdditionalContent)).toBeInTheDocument();
  });
});
