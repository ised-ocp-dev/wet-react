import React from 'react';
import '../../style.css';

export interface LightboxProps extends React.HTMLAttributes<HTMLElement> {
  /** contents of Lightbox */
  children?: React.ReactNode;
  /** true for lightboxes in a gallery, false for standalone */
  gallery?: boolean;
  /** title of lightbox */
  title?: string;
  /** link to lightbox content */
  link?: string;
  /** makes the lightbox behave like a modal */
  modal?: boolean;
  /** overrides the default content type with the ajax content type */
  ajax?: boolean;
  /** overrides default content type with the image content type */
  image?: boolean;
  /** overrides default content type with the inline content type */
  inline?: boolean;
  /** overrides default content type with the iframe content type */
  iframe?: boolean;
  /** adds magnific popup settings through `data-wb-lbx` tag */
  magnificPopup?: string;
  /** the selector to filter content */
  filter?: string;
}

const Lightbox = ({
  children,
  gallery = false,
  title = '',
  link = '',
  modal = false,
  ajax = false,
  image = false,
  inline = false,
  iframe = false,
  magnificPopup = '',
  filter = '',
}: LightboxProps) => {
  const className = gallery ? '' : 'wb-lbx';
  const modalName = modal ? 'lbx-modal' : '';
  const ajaxName = ajax ? 'lbx-ajax' : '';
  const imageName = image ? 'lbx-image' : '';
  const inlineName = inline ? 'lbx-inline' : '';
  const iframeName = iframe ? 'lbx-iframe' : '';
  return (
    <a
      className={`${className} ${modalName} ${ajaxName} ${imageName} ${inlineName} ${iframeName}`}
      href={link}
      title={title}
      data-wb-lbx={`${magnificPopup} ${filter}`}
    >
      {children}
      {React.createElement('section')}
    </a>
  );
};

export default Lightbox;
