import React from 'react';
import { render, screen } from '@testing-library/react';

import Heading from '@components/Heading';

describe('Heading', () => {
  const HeadingContent = 'Quote this';
  const HeadingSecondary = 'second';

  describe('Test Heading levels', () => {
    test('render Heading h1', () => {
      render(<Heading level="h1" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h2', () => {
      render(<Heading level="h2" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h3', () => {
      render(<Heading level="h3" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h4', () => {
      render(<Heading level="h4" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h5', () => {
      render(<Heading level="h5" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h6', () => {
      render(<Heading level="h6" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
  });
  test('heading secondary text', () => {
    render(
      <Heading
        level="h6"
        text={HeadingContent}
        secondaryText={HeadingSecondary}
      />
    );
    expect(screen.getByText(HeadingSecondary)).toBeInTheDocument();
    expect(screen.getByText(HeadingSecondary)).toHaveClass('small');
  });
  test('heading underlined', () => {
    render(
      <Heading
        level="h6"
        text={HeadingContent}
        secondaryText={HeadingSecondary}
        underline
      />
    );
    expect(screen.getByText(HeadingSecondary)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass(
      'page-header'
    );
  });
});
