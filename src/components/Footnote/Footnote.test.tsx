import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Footnote', () => {
  const FootnoteContent = 'Quote this';
  const FootnoteFooter = 'Foot';
  const FootnoteCite = 'Cit';

  describe('Test Footnote with/without sources', () => {
    test('renders the basic Footnote component', () => {
      render(<blockquote>{FootnoteContent}</blockquote>);
      expect(screen.getByText(FootnoteContent)).toBeInTheDocument();
    });
    test('renders the Footnote component with footer', () => {
      render(
        <blockquote>
          {FootnoteContent}
          <footer>{FootnoteFooter}</footer>
        </blockquote>
      );
      expect(screen.getByText(FootnoteContent)).toBeInTheDocument();
      expect(screen.getByText(FootnoteFooter)).toBeInTheDocument();
    });
    test('renders the Footnote component with citation', () => {
      render(
        <blockquote>
          {FootnoteContent}
          <footer>
            <cite>{FootnoteCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(FootnoteContent)).toBeInTheDocument();
      expect(screen.getByText(FootnoteCite)).toBeInTheDocument();
    });
    test('renders the Footnote component with footer and citation', () => {
      render(
        <blockquote>
          {FootnoteContent}
          <footer>
            {FootnoteFooter}
            <br />
            <cite>{FootnoteCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(FootnoteContent)).toBeInTheDocument();
      expect(screen.getByText(FootnoteFooter)).toBeInTheDocument();
      expect(screen.getByText(FootnoteCite)).toBeInTheDocument();
    });
  });
  describe('Test justification', () => {
    test('source justified', () => {
      render(
        <blockquote>
          {FootnoteContent}
          <footer className="text-right">
            {FootnoteFooter}
            <br />
            <cite>{FootnoteCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(FootnoteFooter)).toHaveClass('text-right');
    });
    test('block quote justified', () => {
      render(
        <blockquote className="blockquote-reverse">
          {FootnoteContent}
          <footer>
            {FootnoteFooter}
            <br />
            <cite>{FootnoteCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(FootnoteContent)).toHaveClass(
        'blockquote-reverse'
      );
    });
  });
});
