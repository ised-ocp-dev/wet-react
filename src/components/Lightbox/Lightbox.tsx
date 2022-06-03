import React from 'react';
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
          if ((e.target as Element).closest('.wb-lbx') != null) {
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
                  (
                    sib2.childNodes[0].childNodes[0].childNodes[0] as Element
                  ).scrollIntoView({
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
