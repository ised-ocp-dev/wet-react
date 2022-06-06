import React from 'react';

export interface CarouselCaptionProps
  extends React.FormHTMLAttributes<HTMLDivElement> {
  /** Content of Carousel Caption component. */
  children?: React.ReactNode;
  /** Additional custom classNames */
  className?: string;
}

const CarouselCaption = ({
  children,
  className,
  ...rest
}: CarouselCaptionProps) => (
  <div className={className} {...rest} style={{ padding: 5 }}>
    {children}
  </div>
);

export default CarouselCaption;
