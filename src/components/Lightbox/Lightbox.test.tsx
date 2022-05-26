import React from 'react';
import { render, screen } from '@testing-library/react';

import Lightbox from '@components/Lightbox';

describe('Lightbox', () => {
  describe('Test Lightbox', () => {
    test('renders the basic Lightbox component', () => {
      render(<Lightbox>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
    });
    test('renders the Lightbox component with title/footer', () => {
      render(<Lightbox title="titleText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute(
        'title',
        'titleText'
      );
    });
    test('renders the Lightbox component with src', () => {
      render(<Lightbox src="srcText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children')).toHaveAttribute('href', 'srcText');
    });
  });
  describe('Test gallery', () => {
    test('renders the Lightbox component with gallery', () => {
      render(<Lightbox gallery>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).not.toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
    });
    test('renders the Gallery component', () => {
      render(
        <Lightbox.Gallery>
          <Lightbox gallery>children</Lightbox>
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).not.toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'wb-lbx-inited'
      );
    });
    test('renders the Gallery component with custom tag', () => {
      render(
        <Lightbox.Gallery tag="div">
          <Lightbox gallery>children</Lightbox>
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).not.toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'wb-init'
      );
      expect(screen.getByText('children').closest('div')).toHaveClass(
        'wb-lbx-inited'
      );
    });
    test('renders the Gallery component with hide', () => {
      render(
        <Lightbox.Gallery hide>
          <Lightbox gallery>children</Lightbox>
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).not.toHaveClass('wb-lbx');
      expect(screen.getByText('children')).toHaveClass('wb-init');
      expect(screen.getByText('children')).toHaveClass('wb-lbx-inited');
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'lbx-hide-gal'
      );
      expect(screen.getByText('children').closest('section')).not.toHaveClass(
        'lbx-gal'
      );
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'wb-init'
      );
      expect(screen.getByText('children').closest('section')).toHaveClass(
        'wb-lbx-inited'
      );
    });
  });
});
