import React from 'react';
import CarouselRB from 'react-bootstrap/Carousel';
import ContainerRB from 'react-bootstrap/Container';
import RowRB from 'react-bootstrap/Row';
import ColRB from 'react-bootstrap/Col';
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
    <ContainerRB>
      <RowRB>
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
      </RowRB>
      <RowRB style={{ display: 'flex', paddingTop: 7, alignItems: 'center' }}>
        <ColRB
          lg={1}
          md={1}
          sm={2}
          xl={1}
          xs={2}
          xxl={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
        </ColRB>
        <ColRB lg={1} md={2} sm={2} xl={1} xs={3} xxl={1}>
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
        </ColRB>
        <ColRB
          lg={1}
          md={1}
          sm={2}
          xl={1}
          xs={2}
          xxl={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
        </ColRB>
        <ColRB
          lg={9}
          md={8}
          sm={6}
          xl={9}
          xs={5}
          xxl={9}
          style={{ display: 'flex' }}
        >
          <Button
            aria-label={intervalValue ? 'pause' : 'play'}
            style={{ display: 'flex', marginLeft: 'auto' }}
            disabled={interval === null}
            onClick={() =>
              intervalValue
                ? setIntervalValue(null)
                : setIntervalValue(interval)
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
        </ColRB>
      </RowRB>
    </ContainerRB>
  );
};

export default Carousel;
