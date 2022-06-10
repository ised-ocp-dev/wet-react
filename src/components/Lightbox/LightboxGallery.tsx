import React, { useEffect } from 'react';
import Modal from '@components/Modal';
import './Lightbox.css';
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

const LightboxGallery = ({
  children,
  tag = 'section',
  id,
  ...rest
}: LightboxGalleryProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);
  const [images, setImages] = React.useState<HTMLCollectionOf<Element>>();
  const [numImages, setNumImages] = React.useState(0);

  function tempOpen(e: Event) {
    // open gallery, get index of lightbox to open
    setIsOpen(true);
    const newIndex = Number(
      (
        (e.target as Element).closest('.lightbox-breezy') as Element
      ).getAttribute('index')
    );
    if (newIndex || newIndex === 0) {
      setIndex(newIndex);
    }
  }

  useEffect(() => {
    const linkList = document
      .getElementById(id)
      ?.getElementsByClassName('lightbox-breezy');
    // on load, go through children to find lightboxes. Give each an index and callback function to trigger gallery
    if (linkList) {
      for (let i = 0; i < linkList.length; i += 1) {
        (linkList[i] as Element).setAttribute('index', `${i}`);
        (linkList[i].childNodes[0] as HTMLElement).addEventListener(
          'click',
          (e) => tempOpen(e),
          false
        );
      }
      // get lightboxes for future reference
      const temp = document.getElementById(id);
      if (temp) {
        setImages(temp.getElementsByClassName('lightbox-breezy'));
        setNumImages(temp.getElementsByClassName('lightbox-breezy').length);
      }
    }
  }, []);

  return (
    <span className="lbx-gal" id={id}>
      <Modal
        show={isOpen}
        centered // supposed to center it, but css class doesn't exist...
        animation={false}
        backdropClassName="mfp-zoom-out-cur" // supposed to add cursor: zoom-out, but broken bc it's behind lightbox div (siblings, lower z-index)
        onHide={() => setIsOpen(false)}
        className="mfp-zoom-out-cur"
      >
        <Modal.Body
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              setIndex(index === 0 ? numImages - 1 : index - 1);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              setIndex((index + 1) % numImages);
            }
          }}
          bsPrefix="bg-darker"
          style={{ cursor: 'auto' }}
        >
          <button
            title="Close overlay (escape key)"
            type="button"
            className="mfp-close"
            onClick={() => setIsOpen(false)}
            style={{ width: 'auto' }}
          >
            ×<span className="wb-inv"> Close overlay (escape key)</span>
          </button>
          <img
            className="mfp-img"
            src={
              // couldn't assign string|null to src, so I convert it to string, that way null becomes "null" lol
              images !== undefined && images[index]
                ? String(
                    (images[index].childNodes[0] as Element).getAttribute(
                      'href'
                    )
                  )
                : ''
            }
            alt="alternate"
          />
          <figcaption>
            <div className="mfp-bottom-bar" id="lbx-title">
              <div className="mfp-title">
                {images !== undefined && images[index]
                  ? (images[index].childNodes[0] as Element).getAttribute(
                      'title'
                    )
                  : ''}
              </div>
              <div className="mfp-counter">
                Item {index + 1} of {numImages}
              </div>
            </div>
          </figcaption>
          <button
            title="Previous (left arrow key)"
            type="button"
            className="mfp-arrow mfp-arrow-left mfp-prevent-close"
            onClick={() => {
              const newIndex = (index - 1) % numImages;
              setIndex(newIndex < 0 ? numImages - 1 : newIndex);
            }}
          >
            <span className="wb-inv"> Previous (left arrow key)</span>
          </button>
          <button
            title="Next (right arrow key)"
            type="button"
            className="mfp-arrow mfp-arrow-right mfp-prevent-close"
            onClick={() => {
              setIndex((index + 1) % numImages);
            }}
          >
            <span className="wb-inv"> Next (right arrow key)</span>
          </button>
        </Modal.Body>
      </Modal>
      {React.createElement(tag, { ...rest }, children)}
    </span>
  );
};

export default LightboxGallery;
