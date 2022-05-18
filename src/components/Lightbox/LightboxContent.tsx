import React from 'react';
import '../../style.css';

export interface LightboxContentProps
  extends React.HTMLAttributes<HTMLElement> {
  /** contents of Lightbox */
  children?: React.ReactNode;
  /** id for link to point to */
  id?: string;
  /** hides inline popup content */
  hide?: boolean;
  /** restrict width of the popup */
  modal?: boolean;
}

const LightboxContent = ({
  children,
  id = '',
  modal = false,
  hide = false,
}: LightboxContentProps) => {
  const modalName = modal ? 'modal-dialog' : '';
  const hideName = hide ? 'mfp-hide' : '';
  return (
    <section
      id={id}
      className={`${hideName} ${modalName} modal-content overlay-def`}
    >
      {children}
    </section>
  );
};

export default LightboxContent;
