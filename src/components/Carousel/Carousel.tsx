import React from 'react';
import CarouselRB from 'react-bootstrap/Carousel';
import Text from '@components/Text';
import Button from '@components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import '../../style.css';
import './Carousel.css';

export interface CarouselProps {
  /** Content of Carousel component. */
  children?: React.ReactNode;
  /** Translate the component's text to French. */
  french?: boolean;
  /** The amount of time to delay between automatically cycling an item. If not specified, the carousel will not automatically cycle. */
  interval?: number | null;
}

const Carousel = ({
  children,
  interval = null,
  french = false,
  ...rest
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [intervalValue, setIntervalValue] = React.useState(interval);
  const numberOfSlides = React.Children.count(children);
  const itemLabel = french ? 'Article' : 'Item';
  const ofLabel = french ? 'de' : 'of';
  const playLabel = french ? 'Lancer' : 'Play';

  return (
    <div>
      <div>
        {intervalValue ? (
          <CarouselRB
            fade
            indicators={false}
            controls={false}
            pause={false}
            interval={intervalValue}
            onSlide={() => setCurrentIndex((currentIndex + 1) % numberOfSlides)}
            {...rest}
          >
            {children}
          </CarouselRB>
        ) : (
          <CarouselRB
            fade
            indicators={false}
            controls={false}
            pause={false}
            activeIndex={currentIndex}
            {...rest}
          >
            {children}
          </CarouselRB>
        )}
      </div>
      <div style={{ display: 'flex', padding: 5, alignItems: 'center' }}>
        <Button
          aria-label="previous"
          data-testid="previous-btn"
          style={{ borderRadius: '50%' }}
          onClick={() => {
            if (intervalValue) {
              setIntervalValue(null);
            }
            setCurrentIndex(Math.abs(currentIndex - 1) % numberOfSlides);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="3x" />
        </Button>
        <div style={{ marginLeft: 15, marginRight: 15 }}>
          <Text
            style={{
              display: 'block',
              textAlign: 'center',
              margin: 'auto',
            }}
          >
            {itemLabel}
          </Text>
          <Text
            size="h3"
            style={{
              display: 'block',
              textAlign: 'center',
              margin: 'auto',
            }}
          >{`${currentIndex + 1} ${ofLabel} ${numberOfSlides}`}</Text>
        </div>
        <Button
          aria-label="next"
          style={{ borderRadius: '50%' }}
          onClick={() => {
            if (intervalValue) {
              setIntervalValue(null);
            }
            setCurrentIndex((currentIndex + 1) % numberOfSlides);
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="3x" />
        </Button>
        <Button
          aria-label={intervalValue ? 'pause' : 'play'}
          style={{ display: 'flex', marginLeft: 'auto' }}
          disabled={interval === null}
          onClick={() =>
            intervalValue ? setIntervalValue(null) : setIntervalValue(interval)
          }
        >
          {intervalValue ? (
            <FontAwesomeIcon
              icon={faPause}
              size="2x"
              style={{ margin: 'auto' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              size="2x"
              style={{ margin: 'auto' }}
            />
          )}
          <Text size="h3" style={{ margin: 'auto', marginLeft: 7 }}>
            {intervalValue ? 'Pause' : `${playLabel}`}
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
