import React from 'react';
import '../../style.css';

export interface LightboxGalleryProps
  extends React.HTMLAttributes<HTMLElement> {
  /** contents of LightboxGallery */
  children?: React.ReactNode;
  /** type of HTML element the gallery will be based on */
  tag?: string;
  /** hides all but the first item in the gallery */
  hide?: boolean;
}

const LightboxGallery = ({
  children,
  tag = '',
  hide = false,
}: LightboxGalleryProps) => {
  const name = hide ? 'lbx-gal' : 'lbx-hide-gal';
  return React.createElement(tag, { class: name }, children);
};

export default LightboxGallery;
