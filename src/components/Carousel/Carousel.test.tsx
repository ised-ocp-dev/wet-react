import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carousel from '@components/Carousel';

describe('Carousel Tests', () => {
  describe('Carousel Tests', () => {
    test('Carousel interval test', async () => {
      render(
        <Carousel interval={1000}>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      await waitFor(
        () => {
          expect(screen.getByText('Slide 2')).toHaveClass('active');
        },
        { timeout: 2000 }
      );
    });
    test('Testing French labels', () => {
      render(
        <Carousel french>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel>
      );
      expect(screen.getByText('Lancer')).toBeInTheDocument();
      expect(screen.getByText('Article')).toBeInTheDocument();
      expect(screen.getByText('1 de 1')).toBeInTheDocument();
    });
  });

  describe('Carousel Item Tests', () => {
    test('Testing Carousel Item exists', () => {
      render(
        <Carousel>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel>
      );
      expect(screen.getByText('Slide')).toBeInTheDocument();
    });
    test('Carousel Item interval test', () => {
      const result = render(
        <Carousel>
          <Carousel.Item interval={1000}>Slide</Carousel.Item>
        </Carousel>
      );
      expect(
        result.container.querySelector('div[interval="1000"]')
      ).toBeInTheDocument();
    });
  });

  describe('Carousel Caption Tests', () => {
    test('Carousel Caption test', () => {
      render(
        <Carousel>
          <Carousel.Item>
            <Carousel.Caption className="carousel-item-caption">
              Caption
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
      expect(screen.getByText('Caption')).toHaveClass('carousel-item-caption');
    });
  });

  describe('Carousel Button Actions', () => {
    test('Carousel previous button test (no interval)', async () => {
      render(
        <Carousel>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      fireEvent.click(screen.getByLabelText('previous'));
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toHaveClass('active');
      });
    });
    test('Carousel previous button test (with interval)', async () => {
      render(
        <Carousel interval={1000}>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      fireEvent.click(screen.getByLabelText('previous'));
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toHaveClass('active');
      });
    });
    test('Carousel next button test (no interval)', async () => {
      render(
        <Carousel>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      fireEvent.click(screen.getByLabelText('next'));
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toHaveClass('active');
      });
    });
    test('Carousel next button test (with interval)', async () => {
      render(
        <Carousel interval={1000}>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      fireEvent.click(screen.getByLabelText('next'));
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toHaveClass('active');
      });
    });
    test('Carousel pause/play button test', async () => {
      render(
        <Carousel interval={1000}>
          <Carousel.Item>Slide 1</Carousel.Item>
          <Carousel.Item>Slide 2</Carousel.Item>
        </Carousel>
      );
      fireEvent.click(screen.getByLabelText('pause'));
      await waitFor(() => {
        expect(screen.getByLabelText('play')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('play'));
      await waitFor(() => {
        expect(screen.getByLabelText('pause')).toBeInTheDocument();
      });
    });
  });
});
