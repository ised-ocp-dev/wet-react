import React from 'react';

export interface CarouselCaptionProps
  extends React.FormHTMLAttributes<HTMLDivElement> {
  /** Content of Carousel Caption component. */
  children?: React.ReactNode;
}

const CarouselCaption = ({ children, ...rest }: CarouselCaptionProps) => (
  <div className="carousel-item-caption" {...rest} style={{ padding: 5 }}>
    {children}
  </div>
);

export default CarouselCaption;
