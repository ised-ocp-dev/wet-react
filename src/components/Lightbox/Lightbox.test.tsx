import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Lightbox', () => {
  const LightboxContent = 'Quote this';
  const LightboxFooter = 'Foot';
  const LightboxCite = 'Cit';

  describe('Test Lightbox with/without sources', () => {
    test('renders the basic Lightbox component', () => {
      render(<blockquote>{LightboxContent}</blockquote>);
      expect(screen.getByText(LightboxContent)).toBeInTheDocument();
    });
    test('renders the Lightbox component with footer', () => {
      render(
        <blockquote>
          {LightboxContent}
          <footer>{LightboxFooter}</footer>
        </blockquote>
      );
      expect(screen.getByText(LightboxContent)).toBeInTheDocument();
      expect(screen.getByText(LightboxFooter)).toBeInTheDocument();
    });
    test('renders the Lightbox component with citation', () => {
      render(
        <blockquote>
          {LightboxContent}
          <footer>
            <cite>{LightboxCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(LightboxContent)).toBeInTheDocument();
      expect(screen.getByText(LightboxCite)).toBeInTheDocument();
    });
    test('renders the Lightbox component with footer and citation', () => {
      render(
        <blockquote>
          {LightboxContent}
          <footer>
            {LightboxFooter}
            <br />
            <cite>{LightboxCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(LightboxContent)).toBeInTheDocument();
      expect(screen.getByText(LightboxFooter)).toBeInTheDocument();
      expect(screen.getByText(LightboxCite)).toBeInTheDocument();
    });
  });
  describe('Test justification', () => {
    test('source justified', () => {
      render(
        <blockquote>
          {LightboxContent}
          <footer className="text-right">
            {LightboxFooter}
            <br />
            <cite>{LightboxCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(LightboxFooter)).toHaveClass('text-right');
    });
    test('block quote justified', () => {
      render(
        <blockquote className="blockquote-reverse">
          {LightboxContent}
          <footer>
            {LightboxFooter}
            <br />
            <cite>{LightboxCite}</cite>
          </footer>
        </blockquote>
      );
      expect(screen.getByText(LightboxContent)).toHaveClass(
        'blockquote-reverse'
      );
    });
  });
});
