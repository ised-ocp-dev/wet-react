import React from 'react';
import CarouselRB from 'react-bootstrap/Carousel';

export interface CarouselItemProps
  extends React.FormHTMLAttributes<HTMLDivElement> {
  /** Content of Carousel Item component. */
  children?: React.ReactNode;
  /** The amount of time to delay between automatically cycling this specific item. Will default to the Carousel's interval prop value if none is specified. */
  interval?: number;
}

const CarouselItem = React.forwardRef(
  (
    { children, interval, ...rest }: CarouselItemProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <CarouselRB.Item interval={interval} ref={ref} {...rest}>
      {children}
    </CarouselRB.Item>
  )
);

export default CarouselItem;
