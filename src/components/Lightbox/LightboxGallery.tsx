import React from 'react';
import '../../style.css';

export interface LightboxGalleryProps
  extends React.HTMLAttributes<HTMLElement> {
  /** contents of LightboxGallery */
  children?: React.ReactNode;
  /** HTML tag the gallery will be based on */
  tag?: string;
}

function galleryCloseLightbox(e: Element) {
  const gallery = e.closest('.lbx-gal');
  if (gallery === null) {
    return;
  }
  const html = gallery.closest('html');
  if (html) {
    const style = html.getAttribute('style');
    if (style) {
      html.setAttribute(
        'style',
        style.replace('margin-right: 17px; overflow: hidden;', '')
      );
    }
  }
  const body = gallery.closest('body');
  if (body) {
    body.classList.remove('mfp-zoom-out-cur');
    body.classList.remove('wb-modal');
  }
  (gallery.childNodes[0] as Element).classList.remove('mfp-bg');
  (gallery.childNodes[0] as Element).classList.remove('mfp-ready');
  (gallery.childNodes[1] as HTMLElement).style.removeProperty('height');
  (gallery.childNodes[1].childNodes[0] as Element).removeAttribute('open');
}

function getNextPrev(hop: number, e: Element) {
  const gallery = e.closest('.lbx-gal');
  if (gallery === null) {
    return;
  }
  const links = gallery.getElementsByClassName('lightbox-breezy');
  let index = 0;
  const fork = gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
    .childNodes[0].childNodes[1] as Element;
  for (let i = 0; i < links.length; i += 1) {
    if (
      (links[i].childNodes[0] as Element).getAttribute('href') ===
      (fork.childNodes[0] as Element).getAttribute('src')
    ) {
      index = i;
      break;
    }
  }
  const newIndex =
    (index + hop) % links.length >= 0
      ? (index + hop) % links.length
      : links.length - 1;
  const newFork =
    links[newIndex].childNodes[2].childNodes[0].childNodes[0].childNodes[0]
      .childNodes[0].childNodes[1];
  const newSrc = (links[newIndex].childNodes[0] as Element).getAttribute(
    'href'
  );
  if (newSrc != null) {
    (fork.childNodes[0] as Element).setAttribute('src', newSrc);
  }
  const newTitle = (
    newFork.childNodes[1].childNodes[0].childNodes[0] as Element
  ).innerHTML;
  (fork.childNodes[1].childNodes[0].childNodes[0] as Element).innerHTML =
    newTitle;
  (fork.childNodes[1].childNodes[0].childNodes[1] as Element).innerHTML = `${
    newIndex + 1
  }/${links.length}`;
  (
    gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0] as Element
  ).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center',
  });
}

const LightboxGallery = ({
  children,
  tag = 'section',
  ...rest
}: LightboxGalleryProps) => {
  const name = 'lbx-gal wb-init wb-lbx-inited';
  return (
    <span className={name}>
      <div
        role="link"
        tabIndex={0}
        aria-label="Close Lightbox"
        onClick={(e1) => {
          galleryCloseLightbox(e1.target as Element);
        }}
        onKeyDown={() => {
          // ignore, handled elsewhere
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
              onClick={(e) => {
                getNextPrev(-1, e.target as Element);
              }}
            >
              <span className="wb-inv"> Previous (left arrow key)</span>
            </button>
            <button
              title="Next (right arrow key)"
              type="button"
              className="mfp-arrow mfp-arrow-right mfp-prevent-close"
              onClick={(e) => {
                getNextPrev(1, e.target as Element);
              }}
            >
              <span className="wb-inv"> Next (right arrow key)</span>
            </button>
          </div>
        </dialog>
      </div>
      {React.createElement(tag, { ...rest }, children)}
    </span>
  );
};

export default LightboxGallery;

x = 5;
