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
          style.replace('margin-right: 17px; overflow: hidden;', 'ty')
        );
      }
    }
    const body = main.closest('body');
    if (body) {
      body.classList.remove('mfp-zoom-out-cur');
      body.classList.remove('wb-modal');
    }
  }
  window.scrollBy(0, -1 * (window.innerHeight / 2));
}

function galleryOpenLightbox(e: Element) {
  const gallery = e.closest('.lbx-gal');
  if (gallery === null) {
    return;
  }
  if (
    (
      e.closest('.lightbox-breezy')?.childNodes[0] as Element
    ).classList.contains('wb-lbx')
  ) {
    const linkList = gallery.getElementsByClassName('lightbox-breezy');
    for (let i = 0; i < linkList.length; i += 1) {
      const link = linkList[i];
      (link.childNodes[0] as Element).classList.remove('wb-lbx');
    }
  }
  e.closest('html')?.setAttribute(
    'style',
    'margin-right: 17px; overflow: hidden;'
  );
  const body = e.closest('body');
  if (body) {
    body.className = 'mfp-zoom-out-cur wb-modal';
  }
  (gallery.childNodes[0] as Element).className = 'mfp-bg mfp-ready ';
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
      gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[1].childNodes[0] as Element
    ).setAttribute('src', src);
  }
  if (title != null) {
    (
      gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[1].childNodes[1].childNodes[0]
        .childNodes[0] as Element
    ).textContent = title;
  }
  (gallery.childNodes[1] as HTMLElement).style.height = `${
    (
      gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[1].childNodes[0] as HTMLImageElement
    ).naturalHeight
  }px`;
  (gallery.childNodes[1].childNodes[0] as Element).setAttribute('open', 'open');
  (
    gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
      .childNodes[0] as Element
  ).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center',
  });
  (
    gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
      .childNodes[0].childNodes[1].childNodes[1].childNodes[0]
      .childNodes[1] as Element
  ).innerHTML = `${index + 1}/${links.length}`;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && gallery != null) {
      fireEvent.click(gallery.childNodes[0]);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && gallery != null) {
      fireEvent.click(gallery.getElementsByClassName('mfp-arrow-left')[0]);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && gallery != null) {
      fireEvent.click(gallery.getElementsByClassName('mfp-arrow-right')[0]);
    }
  });
}

const Lightbox = ({
  children,
  title = '',
  src = '',
  hidden = false,
}: LightboxProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <span className="lightbox-breezy">
      <a
        className="wb-lbx wb-init wb-lbx-inited"
        href={src}
        title={title}
        hidden={hidden}
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).closest('.lbx-gal') === null) {
            setOpen(true);
            (e.target as Element)
              .closest('html')
              ?.setAttribute('style', 'margin-right: 17px; overflow: hidden;');
            const body = (e.target as Element).closest('body');
            if (body) {
              body.className = 'mfp-zoom-out-cur wb-modal';
            }
            const sib2 = (e.target as Element).closest('.lightbox-breezy')
              ?.childNodes[2];
            if (sib2) {
              window.setTimeout(
                // scroll doesn't work bc based on image, doesn't take effect until this function ends,
                // so I added a 0ms timeout and set to smooth to cover up 1-frame spasm
                () =>
                  (sib2 as Element).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                  }),
                0
              );
            }
            document.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                closeLightbox(e.target as Element);
                setOpen(false);
              }
            });
          }
          galleryOpenLightbox(e.target as Element);
        }}
      >
        {children}
      </a>
      <div
        role="link"
        tabIndex={0}
        aria-label="Close Lightbox"
        className={open ? 'mfp-bg mfp-ready' : ''}
        onClick={(e1) => {
          closeLightbox(e1.target as Element);
          setOpen(false);
        }}
        onKeyDown={() => {
          // ignore, handled elsewhere
        }}
      />
      <div
        className="mfp-close-btn-in mfp-auto-cursor mfp-ready"
        style={{
          overflow: 'hidden auto',
          height: open ? `${window.innerHeight}px` : 'auto',
        }}
      >
        <dialog className="mfp-container" open={open}>
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
                    setOpen(false);
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
};

export default Lightbox;
