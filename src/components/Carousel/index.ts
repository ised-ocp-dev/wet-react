import OriginCarousel from './Carousel';
import CarouselItem from './CarouselItem';
import CarouselCaption from './CarouselCaption';

export type CarouselProps = typeof OriginCarousel & {
  Item: typeof CarouselItem;
  Caption: typeof CarouselCaption;
};

const Carousel = OriginCarousel as CarouselProps;

Carousel.Item = CarouselItem;
Carousel.Caption = CarouselCaption;

export default Carousel;
