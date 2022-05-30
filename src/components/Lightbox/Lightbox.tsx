import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react';
import '../../style.css';

export interface LightboxProps extends React.HTMLAttributes<HTMLElement> {
  /** link(s) to the lightbox(es) image(s) */
  src?: string;
  /** content of Lightbox */
  children?: React.ReactNode;
  /** title of lightbox */
  title?: string;
  /** use to hide lightbox, recommended for galleries where you want to only show the first image */
  hidden?: boolean;
}

function closeLightbox(e: Element) {
  const main = e.closest('.lightbox-breezy');
  if (main) {
    const html = main.closest('html');
    if (html) {
      const style = html.getAttribute('style');
      if (style) {
        html.setAttribute(
          'style',
          style.replace('margin-right: 17px; overflow: hidden;', '')
        );
      }
    }
    const body = main.closest('body');
    if (body) {
      body.classList.remove('mfp-zoom-out-cur');
      body.classList.remove('wb-modal');
    }
    (main.childNodes[1] as Element).classList.remove('mfp-bg');
    (main.childNodes[1] as Element).classList.remove('mfp-ready');
    (main.childNodes[2].childNodes[0] as Element).removeAttribute('open');
  }
}

function galleryOpenLightbox(e: Element) {
  e.closest('html')?.setAttribute(
    'style',
    'margin-right: 17px; overflow: hidden;'
  );
  const body = e.closest('body');
  if (body) {
    body.className = 'mfp-zoom-out-cur wb-modal';
  }
  let gallery: Element | null;
  if (e.closest('.lbx-gal') === null) {
    gallery = e.closest('.lbx-hide-gal');
  } else {
    gallery = e.closest('.lbx-gal');
  }
  if (gallery === null) {
    return;
  }
  (gallery.childNodes[0].childNodes[0] as Element).className =
    'mfp-bg mfp-ready ';
  (gallery.childNodes[0].childNodes[1].childNodes[0] as Element).setAttribute(
    'open',
    'open'
  );
  (
    gallery.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
      .childNodes[0] as Element
  ).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center',
  });
  // set src, title, mfp-counter
  const link = e.closest('.lightbox-breezy')?.childNodes[0] as Element;
  const src = link.getAttribute('href');
  const title = link.getAttribute('title');
  const links = gallery.getElementsByClassName('lightbox-breezy');
  let index = 0;
  for (let i = 0; i < links.length; i += 1) {
    if ((links[i].childNodes[0] as Element).getAttribute('href') === src) {
      index = i;
      break;
    }
  }
  if (src != null) {
    (
      gallery.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[0].childNodes[1].childNodes[0] as Element
    ).setAttribute('src', src);
  }
  if (title != null) {
    (
      gallery.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0]
        .childNodes[0] as Element
    ).innerHTML = title;
  }
  (
    gallery.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
      .childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0]
      .childNodes[1] as Element
  ).innerHTML = `${index + 1}/${links.length}`;

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && gallery != null) {
        fireEvent.click(gallery.childNodes[0].childNodes[0]);
      }
    },
    { once: true }
  );
}

const Lightbox = ({
  children,
  title = '',
  src = '',
  hidden = false,
}: LightboxProps) => (
  <span className="lightbox-breezy">
    <a
      className="wb-lbx wb-init wb-lbx-inited"
      href={src}
      title={title}
      hidden={hidden}
      onClick={(e) => {
        e.preventDefault();
        if (
          (e.target as Element).closest('.lbx-gal') === null &&
          (e.target as Element).closest('.lbx-hide-gal') === null
        ) {
          // this lightbox is standalone, do lightbox things
          (e.target as Element)
            .closest('html')
            ?.setAttribute('style', 'margin-right: 17px; overflow: hidden;');
          const body = (e.target as Element).closest('body');
          if (body) {
            body.className = 'mfp-zoom-out-cur wb-modal';
          }
          const sib1 = (e.target as Element).closest('.lightbox-breezy')
            ?.childNodes[1];
          if (sib1) {
            (sib1 as Element).className = 'mfp-bg mfp-ready ';
          }
          const sib2 = (e.target as Element).closest('.lightbox-breezy')
            ?.childNodes[2];
          if (sib2) {
            const sib2c = sib2.childNodes[0];
            if (sib2c) {
              (sib2c as Element).setAttribute('open', 'open');
            }
          }
          const image = (e.target as Element).closest('.lightbox-breezy')
            ?.childNodes[2].childNodes[0].childNodes[0].childNodes[0]; // center lightbox image
          if (image) {
            (image as Element).scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'center',
            });
          }
          document.addEventListener(
            'keydown',
            (event) => {
              if (event.key === 'Escape') {
                closeLightbox(e.target as Element);
              }
            },
            { once: true }
          );
        } else if (
          (
            (e.target as Element).closest('.lightbox-breezy')
              ?.childNodes[0] as Element
          ).classList.contains('wb-lbx')
        ) {
          // this lightbox is in an uninitialized gallery, so init gallery, then open this lightbox in gallery
          let gallery;
          if ((e.target as Element).closest('.lbx-gal') === null) {
            gallery = (e.target as Element).closest('.lbx-hide-gal');
          } else {
            gallery = (e.target as Element).closest('.lbx-gal');
          }
          if (gallery === null) {
            return;
          }
          const links = gallery.getElementsByClassName('lightbox-breezy');
          if (gallery.classList.contains('lbx-gal')) {
            for (let i = 0; i < links.length; i += 1) {
              const link = links[i];
              (link.childNodes[0] as Element).classList.remove('wb-lbx');
            }
          } else {
            (links[0].childNodes[0] as Element).classList.remove('wb-lbx');
            for (let i = 1; i < links.length; i += 1) {
              const link = links[i];
              (link.childNodes[0] as Element).classList.remove('wb-lbx');
              (link.childNodes[0] as Element).setAttribute('hidden', 'true');
            }
          }
          galleryOpenLightbox(e.target as Element);
        } else {
          // else this is in gallery, gallery is inited, so open this lightbox in gallery
          galleryOpenLightbox(e.target as Element);
        }
      }}
    >
      {children}
    </a>
    <div
      role="link"
      tabIndex={0}
      aria-label="Close Lightbox"
      onClick={(e1) => {
        closeLightbox(e1.target as Element);
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
                  closeLightbox(e1.target as Element);
                }}
              >
                ×<span className="wb-inv">Close overlay (escape key)</span>
              </button>
              <figure>
                <img className="mfp-img" alt="hello" src={src} />
                <figcaption>
                  <div className="mfp-bottom-bar" id="lbx-title">
                    <div className="mfp-title">{title}</div>
                    <div className="mfp-counter"> </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </span>
);

export default Lightbox;
