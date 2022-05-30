import React from 'react';
import '../../style.css';

export interface LightboxGalleryProps
  extends React.HTMLAttributes<HTMLElement> {
  /** contents of LightboxGallery */
  children?: React.ReactNode;
  /** HTML tag the gallery will be based on */
  tag?: string;
  /** hides all but the first item in the gallery */
  hide?: boolean;
}

const LightboxGallery = ({
  children,
  tag = 'section',
  hide = false,
}: LightboxGalleryProps) => {
  const name = hide
    ? 'lbx-hide-gal wb-init wb-lbx-inited'
    : 'lbx-gal wb-init wb-lbx-inited';
  return React.createElement(tag, { class: name }, children);
};

export default LightboxGallery;

// remove 'wb-lbx' for lightboxes
