import React from 'react';
import '../../style.css';

export interface LightboxProps extends React.HTMLAttributes<HTMLElement> {
  /** lint to the lightbox image */
  src?: string;
  /** contents of Lightbox */
  children?: React.ReactNode;
  /** true for lightboxes in a gallery, false for standalone */
  gallery?: boolean;
  /** title of lightbox */
  title?: string;
  /** the selector to filter content */
  filter?: string;
}

const Lightbox = ({
  children,
  gallery = false,
  title = '',
  src = '',
}: LightboxProps) => {
  const className = gallery ? '' : 'wb-lbx';
  return (
    <span>
      <a
        className={`${className} wb-init wb-lbx-inited`}
        href={src}
        title={title}
      >
        {children}
      </a>
    </span>
  );
};

export default Lightbox;
