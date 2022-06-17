import React, { useEffect } from 'react';
import ModalRB from 'react-bootstrap/Modal';
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
  /** use to convert all gallery text to french */
  french?: boolean;
}

const LightboxGallery = ({
  children,
  tag = 'section',
  id,
  french = false,
  ...rest
}: LightboxGalleryProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);
  const [images, setImages] = React.useState<HTMLCollectionOf<Element>>();
  const [numImages, setNumImages] = React.useState(0);

  function tempOpen(e: Event) {
    // get index of lightbox to open, if not found Number(null/false)=0
    setIndex(
      Number(
        (
          (e.target as Element).closest('.lightbox-breezy') as Element
        ).getAttribute('index')
      )
    );
    setIsOpen(true);
  }

  useEffect(() => {
    const linkList = document
      .getElementById(id)
      ?.getElementsByClassName('lightbox-breezy');
    // on load, go through children to find lightboxes. Give each an index and callback function to trigger gallery
    if (linkList && linkList.length > 0) {
      for (let i = 0; i < linkList.length; i += 1) {
        (linkList[i] as Element).setAttribute('index', `${i}`);
        (linkList[i].childNodes[0] as HTMLElement).addEventListener(
          'click',
          (e) => tempOpen(e),
          false
        );
      }
    }
    // get lightboxes for displaying
    setImages(
      document.getElementById(id)?.getElementsByClassName('lightbox-breezy')
    );
    setNumImages(
      Number(
        document.getElementById(id)?.getElementsByClassName('lightbox-breezy')
          .length
      )
    );
  }, []);

  return (
    <span className="lbx-gal" id={id}>
      <ModalRB
        size="xl"
        show={isOpen}
        centered
        animation={false}
        backdropClassName="mfp-zoom-out-cur" // supposed to add cursor: zoom-out, but broken bc it's behind lightbox div (siblings, lower z-index)
        onHide={() => setIsOpen(false)}
        className="mfp-zoom-out-cur"
      >
        <ModalRB.Body
          tabIndex={-1}
          onKeyDown={(e: { key: string }) => {
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
            title={
              french
                ? "Fermer la fenêtre superposée (touche d'échappement)"
                : 'Close overlay (escape key)'
            }
            type="button"
            className="mfp-close"
            onClick={() => setIsOpen(false)}
            style={{ width: 'auto' }}
          >
            ×
            <span className="wb-inv">
              {french
                ? " Fermer la fenêtre superposée (touche d'échappement)"
                : ' Close overlay (escape key)'}
            </span>
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
                {french
                  ? `Article ${index + 1} de ${numImages}`
                  : `Item ${index + 1} of ${numImages}`}
              </div>
            </div>
          </figcaption>
          <button
            title={
              french ? 'Précédent (touche gauche)' : 'Previous (left arrow key)'
            }
            type="button"
            className="mfp-arrow mfp-arrow-left mfp-prevent-close"
            onClick={() => {
              setIndex(index === 0 ? numImages - 1 : index - 1);
            }}
          >
            <span className="wb-inv">
              {french
                ? ' Précédent (touche gauche)'
                : ' Previous (left arrow key)'}
            </span>
          </button>
          <button
            title={
              french ? 'Suivant (touche droite)' : 'Next (right arrow key)'
            }
            type="button"
            className="mfp-arrow mfp-arrow-right mfp-prevent-close"
            onClick={() => {
              setIndex((index + 1) % numImages);
            }}
          >
            <span className="wb-inv">
              {french ? ' Suivant (touche droite)' : ' Next (right arrow key)'}
            </span>
          </button>
        </ModalRB.Body>
      </ModalRB>
      {React.createElement(tag, { ...rest }, children)}
    </span>
  );
};

export default LightboxGallery;
