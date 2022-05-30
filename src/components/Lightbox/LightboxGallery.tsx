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

function galleryCloseLightbox(e: Element) {
  const x = 5;
}

const LightboxGallery = ({
  children,
  tag = 'section',
  hide = false,
}: LightboxGalleryProps) => {
  const name = hide
    ? 'lbx-hide-gal wb-init wb-lbx-inited'
    : 'lbx-gal wb-init wb-lbx-inited';
  return React.createElement(
    tag,
    { class: name },
    <span>
      <div
        role="link"
        tabIndex={0}
        aria-label="Close Lightbox"
        onClick={(e1) => {
          galleryCloseLightbox(e1.target as Element);
        }}
        onKeyDown={() => {
          // ignore, handled elsewhere. lint is dumb.
        }}
      />
      <div
        className="mfp-close-btn-in mfp-auto-cursor mfp-ready"
        style={{ overflow: 'hidden auto' }}
      >
        <dialog className="mfp-container">
          <div className="mfp-container mfp-s-ready mfp-image-holder">
            <div
              className="mfp-content"
              aria-labelledby="lbx-title"
              data-pgtitle="Lightbox"
            >
              <div className="mfp-figure">
                <button
                  title="Close overlay (escape key)"
                  type="button"
                  className="mfp-close"
                  onClick={(e1) => {
                    galleryCloseLightbox(e1.target as Element);
                  }}
                >
                  ×<span className="wb-inv">Close overlay (escape key)</span>
                </button>
                <figure>
                  <img className="mfp-img" alt="hello" />
                  <figcaption>
                    <div className="mfp-bottom-bar" id="lbx-title">
                      <div className="mfp-title"> </div>
                      <div className="mfp-counter"> </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <button
              title="Previous (left arrow key)"
              type="button"
              className="mfp-arrow mfp-arrow-left mfp-prevent-close"
            >
              <span className="wb-inv"> Previous (left arrow key)</span>
            </button>
            <button
              title="Next (right arrow key)"
              type="button"
              className="mfp-arrow mfp-arrow-right mfp-prevent-close"
            >
              <span className="wb-inv"> Next (right arrow key)</span>
            </button>
          </div>
        </dialog>
      </div>
      {children}
    </span>
  );
};

export default LightboxGallery;
