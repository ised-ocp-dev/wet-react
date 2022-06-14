import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Lightbox from '@components/Lightbox';
import './Lightbox.css';
import '../../style.css';

describe('Lightbox', () => {
  describe('Test Lightbox Rendering', () => {
    test('renders the basic Lightbox component', () => {
      render(<Lightbox>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')?.parentNode).toHaveClass(
        'lightbox-breezy'
      );
    });
    test('renders the Lightbox component with title/footer', () => {
      render(<Lightbox title="titleText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveAttribute(
        'title',
        'titleText'
      );
    });
    test('renders the Lightbox component with src', () => {
      render(<Lightbox src="srcText">children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveAttribute('href', 'srcText');
    });
    test('renders the Lightbox component with hidden', () => {
      render(<Lightbox hidden>children</Lightbox>);
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children')).toHaveAttribute('hidden', '');
    });
  });
  describe('Test Lightbox functionality', () => {
    test('click basic lightbox', () => {
      render(
        <Lightbox src="hi" title="title">
          <p>children</p>
        </Lightbox>
      );
      expect(screen.getByText('children').parentNode).toHaveAttribute(
        'title',
        'title'
      );
      expect(screen.getByText('children').parentNode).toHaveAttribute(
        'href',
        'hi'
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      expect(
        document.querySelector('.modal')?.getElementsByTagName('img')[0]
      ).toBeInTheDocument();
      expect(
        document.querySelector('.modal')?.getElementsByTagName('img')[0]
      ).toHaveAttribute('src', 'hi');
      expect(
        (
          document
            .querySelector('.modal')
            ?.getElementsByClassName('mfp-title')[0] as Element
        ).innerHTML
      ).toEqual('title');
    });
    test('click basic lightbox, then close with x button', () => {
      render(<Lightbox>children</Lightbox>);
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        fireEvent.click(modalContainer.getElementsByTagName('button')[0]);
        expect(document.querySelector('.modal')).not.toBeInTheDocument();
      }
    });
    test('click basic lightbox, then close with div', () => {
      render(<Lightbox>children</Lightbox>);
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.getElementsByClassName('modal')[0];
      if (modalContainer) {
        fireEvent.click(modalContainer);
        expect(document.querySelector('.modal')).not.toBeInTheDocument();
      }
    });
  });
  describe('Test gallery', () => {
    test('Test standard gallery component', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children2')).toBeInTheDocument();
      expect(screen.getByText('children').parentNode).toHaveClass(
        'lightbox-breezy'
      );
      expect(screen.getByText('children2').parentNode).toHaveClass(
        'lightbox-breezy'
      );
      expect(
        screen.getByText('children').closest('section')?.parentNode
      ).toHaveAttribute('id', 'id');
      expect(
        screen.getByText('children').closest('section')?.parentNode
      ).toHaveClass('lbx-gal');
    });
    test('Test gallery component with custom tag', () => {
      render(
        <Lightbox.Gallery id="id" tag="div">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(screen.getByText('children2')).toBeInTheDocument();
      expect(screen.getByText('children').parentNode).toHaveClass(
        'lightbox-breezy'
      );
      expect(screen.getByText('children2').parentNode).toHaveClass(
        'lightbox-breezy'
      );
      expect(screen.getByText('children').parentNode).toHaveAttribute(
        'index',
        '0'
      );
      expect(screen.getByText('children2').parentNode).toHaveAttribute(
        'index',
        '1'
      );
      expect(
        screen.getByText('children').closest('div')?.parentNode
      ).toHaveAttribute('id', 'id');
      expect(
        screen.getByText('children').closest('div')?.parentNode
      ).toHaveClass('lbx-gal');
    });
  });
  describe('Test gallery functionality', () => {
    test('Test gallery component with open', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
    });
    test('Test gallery component with open+x', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        fireEvent.click(modalContainer.getElementsByTagName('button')[0]);
        expect(document.querySelector('.modal')).not.toBeInTheDocument();
      }
    });
    test('Test gallery component with open+div', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        fireEvent.click(modalContainer);
        expect(document.querySelector('.modal')).not.toBeInTheDocument();
      }
    });
    test('Test gallery component with open second image first', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox src="one">children</Lightbox>
          <Lightbox src="two">children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children2'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
      }
    });

    test('Test gallery component with open+next+prev+prev', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox src="one">children</Lightbox>
          <Lightbox src="two">children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
        fireEvent.click(modalContainer.getElementsByTagName('button')[2]);
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
        fireEvent.click(modalContainer.getElementsByTagName('button')[1]);
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
        fireEvent.click(modalContainer.getElementsByTagName('button')[1]);
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
      }
    });
    test('Test gallery component with open+ArrowRight+ArrowLeft+ArrowLeft', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox src="one">children</Lightbox>
          <Lightbox src="two">children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowRight',
          code: 'ArrowRight',
          keyCode: 39,
          charCode: 39,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
          keyCode: 37,
          charCode: 37,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
          keyCode: 37,
          charCode: 37,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
      }
    });
    test('Test gallery component with open+ArrowDown+ArrowUp+ArrowUp+J', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox src="one">children</Lightbox>
          <Lightbox src="two">children2</Lightbox>
        </Lightbox.Gallery>
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowDown',
          code: 'ArrowDown',
          keyCode: 40,
          charCode: 40,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowUp',
          code: 'ArrowUp',
          keyCode: 38,
          charCode: 38,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'one');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'ArrowUp',
          code: 'ArrowUp',
          keyCode: 38,
          charCode: 38,
        });
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', 'two');
        fireEvent.keyDown(modalContainer.getElementsByTagName('img')[0], {
          key: 'j',
          code: 'KeyJ',
          keyCode: 74,
          charCode: 74,
        });
      }
    });
    test('Test gallery component with missing index on lightbox', () => {
      render(
        <Lightbox.Gallery id="id">
          <Lightbox>children</Lightbox>
          <Lightbox>children2</Lightbox>
        </Lightbox.Gallery>
      );
      (screen.getByText('children').parentNode as Element).removeAttribute(
        'index'
      );
      expect(document.querySelector('.modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('children'));
      expect(document.querySelector('.modal')).toBeInTheDocument();
      const modalContainer = document.querySelector('.modal');
      if (modalContainer) {
        expect(
          document.querySelector('.modal')?.getElementsByTagName('img')[0]
        ).toHaveAttribute('src', '');
      }
    });
  });
  test('Test gallery component with 0 lightboxes', () => {
    render(<Lightbox.Gallery id="id" />);
  });
});
