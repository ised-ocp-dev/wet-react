import React, { useEffect } from 'react';
import '../../style.css';

export interface LightboxGalleryProps
  extends React.HTMLAttributes<HTMLElement> {
  /** contents of LightboxGallery */
  children?: React.ReactNode;
  /** HTML tag the gallery will be based on */
  tag?: string;
  /** unique custom id for gallery */
  id: string;
}

function galleryCloseLightbox(e: Element) {
  const html = e.closest('html');
  if (html) {
    const style = html.getAttribute('style');
    if (style) {
      html.setAttribute(
        'style',
        style.replace('margin-right: 17px; overflow: hidden;', '')
      );
    }
  }
  const body = e.closest('body');
  if (body) {
    body.classList.remove('mfp-zoom-out-cur');
    body.classList.remove('wb-modal');
  }
}

function getNextPrev(hop: number, e: Element) {
  window.setTimeout(
    () =>
      (
        e.closest('.lbx-gal')?.childNodes[1].childNodes[0].childNodes[0]
          .childNodes[0].childNodes[0] as Element
      ).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      }),
    0
  );
}

function galleryOpenLightbox(event: Event, id: string) {
  const e = event.target as Element;
  const gallery = document.getElementById(id);
  if (!gallery) {
    return;
  }
  e.closest('html')?.setAttribute(
    'style',
    'margin-right: 17px; overflow: hidden;'
  );
  const body = e.closest('body');
  if (body) {
    body.className = 'mfp-zoom-out-cur wb-modal';
  }
  window.setTimeout(
    () =>
      (
        gallery.childNodes[1].childNodes[0].childNodes[0].childNodes[0]
          .childNodes[0] as Element
      ).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      }),
    0
  );
}

const LightboxGallery = ({
  children,
  tag = 'section',
  id,
  ...rest
}: LightboxGalleryProps) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);
  const temp = document.getElementById(id);
  const numImages =
    temp === null ? 0 : temp.getElementsByClassName('lightbox-breezy').length;
  function tempOpen(e: Event) {
    galleryOpenLightbox(e, id);
    setOpen(true);
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        setOpen(false);
        galleryCloseLightbox(ev.target as Element);
      }
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowLeft') {
        const newIndex = (index - 1) % numImages;
        setIndex(newIndex < 0 ? numImages - 1 : newIndex);
        window.setTimeout(
          () =>
            (
              (ev.target as Element).closest('.lbx-gal')?.childNodes[1]
                .childNodes[0].childNodes[0].childNodes[0]
                .childNodes[0] as Element
            ).scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'center',
            }),
          0
        );
      }
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight') {
        setIndex((index + 1) % numImages);
        console.log(index);
        getNextPrev(1, ev.target as Element);
      }
    });
    const temp2 = Number(
      (
        (e.target as Element).closest('.lightbox-breezy')
          ?.childNodes[0] as Element
      ).getAttribute('index')
    );
    if (temp2 || temp2 === 0) {
      setIndex(temp2);
    }
  }

  useEffect(() => {
    const linkList = document
      .getElementById(id)
      ?.getElementsByClassName('lightbox-breezy');
    if (linkList) {
      for (let i = 0; i < linkList.length; i += 1) {
        (linkList[i].childNodes[0] as Element).classList.remove('wb-lbx');
        (linkList[i].childNodes[0] as Element).setAttribute('index', `${i}`);
        (linkList[i].childNodes[0] as HTMLElement).addEventListener(
          'click',
          (e) => tempOpen(e),
          false
        );
      }
    }
  }, []);

  return (
    <span className="lbx-gal wb-init wb-lbx-inited" id={id}>
      <div
        role="link"
        tabIndex={0}
        aria-label="Close Lightbox"
        className={open ? 'mfp-bg mfp-ready' : ''}
        onClick={(e1) => {
          setOpen(false);
          galleryCloseLightbox(e1.target as Element);
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
                    setOpen(false);
                    galleryCloseLightbox(e1.target as Element);
                  }}
                >
                  ×<span className="wb-inv">Close overlay (escape key)</span>
                </button>
                <figure>
                  <img
                    className="mfp-img"
                    src={
                      (document
                        .getElementById(id)
                        ?.getElementsByClassName('lightbox-breezy')[index]
                        ?.childNodes[0] as Element)
                        ? (
                            document
                              .getElementById(id)
                              ?.getElementsByClassName('lightbox-breezy')[index]
                              ?.childNodes[0] as Element
                          ).getAttribute('href')
                        : ''
                    }
                    alt="hello"
                  />
                  <figcaption>
                    <div className="mfp-bottom-bar" id="lbx-title">
                      <div className="mfp-title">
                        {(document
                          .getElementById(id)
                          ?.getElementsByClassName('lightbox-breezy')[index]
                          ?.childNodes[0] as Element)
                          ? (
                              document
                                .getElementById(id)
                                ?.getElementsByClassName('lightbox-breezy')[
                                index
                              ]?.childNodes[0] as Element
                            ).getAttribute('title')
                          : ''}
                      </div>
                      <div className="mfp-counter">{`${
                        index + 1
                      }/${numImages}`}</div>
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
                const newIndex = (index - 1) % numImages;
                setIndex(newIndex < 0 ? numImages - 1 : newIndex);
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
                setIndex((index + 1) % numImages);
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
