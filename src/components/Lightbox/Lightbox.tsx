import React from 'react';
import '../../style.css';

export interface LightboxProps extends React.HTMLAttributes<HTMLElement> {
  /** link(s) to the lightbox(es) image(s) */
  src?: string;
  /** contents of Lightbox(es) */
  children?: React.ReactNode;
  /** true for lightboxes in a gallery, false for standalone */
  gallery?: boolean;
  /** title of lightbox */
  title?: string;
  /** hides all but the first item in the gallery */
  hide?: boolean;
}

const Lightbox = ({
  children,
  gallery = false,
  title = '',
  src = '',
}: LightboxProps) => {
  const className = gallery ? '' : 'wb-lbx';
  return (
    <span>
      <a
        className={`${className} wb-init wb-lbx-inited`}
        href={src}
        title={title}
        onLoad={console.log('LOADED')}
        onClick={(e) => {
          console.log('hi');
          e.preventDefault();
          (e.target as Element)
            .closest('html')
            ?.setAttribute('style', 'margin-right: 17px; overflow: hidden;');
          const body = (e.target as Element).closest('body');
          if (body) {
            body.className = 'mfp-zoom-out-cur wb-modal';
          }
          const sib1 = (e.target as Element).parentNode?.parentNode
            ?.childNodes[1];
          if (sib1) {
            (sib1 as Element).className = 'mfp-bg mfp-ready';
          }
          const sib2 = (e.target as Element).parentNode?.parentNode
            ?.childNodes[2];
          if (sib2) {
            (sib2 as Element).className += 'mfp-wrap';
            const sib2c = sib2.childNodes[0];
            if (sib2c) {
              (sib2c as Element).setAttribute('open', 'open');
            }
          }
        }}
      >
        {children}
      </a>
      <div />
      <div
        className="mfp-close-btn-in mfp-auto-cursor mfp-ready"
        open="open"
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
                >
                  ×<span className="wb-inv">Close overlay (escape key)</span>
                </button>
                <figure>
                  <img
                    className="mfp-img"
                    alt="hello"
                    src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-e28def62c2d01ee6368d9aa312c68998415b5e72-s1100-c50.jpg"
                  />
                  <figcaption>
                    <div className="mfp-bottom-bar" id="lbx-title">
                      <div className="mfp-title">Image 1</div>
                      <div className="mfp-counter">1/1</div>
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

/**
body->class="mfp-zoom-out-cur wb-modal"
html->style="margin-right: 17px; overflow: hidden;"
hook up x button, esc, offclick
dialog open
top div


disable <a> href
for galleries: add 2 buttons, currPos text, handle hide property

<><div class="mfp-bg mfp-ready"></div> // makes it black
<div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" open="open" style="overflow: hidden auto;">
  <dialog className="mfp-container" open="open">
    <div className="mfp-container mfp-s-ready mfp-image-holder">
      <div className="mfp-content" aria-labelledby="lbx-title" data-pgtitle="Lightbox">
        <div className="mfp-figure">
          <button title="Close overlay (escape key)" type="button" className="mfp-close">
            ×
            <span className="wb-inv">
              Close overlay (escape key)
            </span>
          </button>
          <figure>
            <img className="mfp-img" alt="happyGuy" src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-e28def62c2d01ee6368d9aa312c68998415b5e72-s1100-c50.jpg" />
            <figcaption>
              <div className="mfp-bottom-bar" id="lbx-title">
                <div className="mfp-title">
                  Image 1
                </div>
                <div className="mfp-counter"></div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </dialog>
</div><div class="mfp-wrap mfp-gallery mfp-close-btn-in mfp-auto-cursor mfp-ready" tabindex="-1" open="open" style="overflow: hidden auto;"><dialog class="mfp-container" open="open"><div class="mfp-container mfp-image-holder mfp-s-ready"><div class="mfp-content" aria-labelledby="lbx-title" data-pgtitle="Lightbox"><div class="mfp-figure"><button title="Close overlay (escape key)" type="button" class="mfp-close">×<span class="wb-inv"> Close overlay (escape key)</span></button><figure><img class="mfp-img" alt="Image 4" src="demo/4_b.jpg" style="max-height: 937px;"><figcaption><div class="mfp-bottom-bar" id="lbx-title"><div class="mfp-title">Image 4</div><div class="mfp-counter">Item 4 of 4</div></div></figcaption></></figure></div></div><div class="mfp-preloader">loading...</div><button title="Previous (left arrow key)" type="button" class="mfp-arrow mfp-arrow-left mfp-prevent-close"><span class="wb-inv"> Previous (left arrow key)</span></button><button title="Next (right arrow key)" type="button" class="mfp-arrow mfp-arrow-right mfp-prevent-close"><span class="wb-inv"> Next (right arrow key)</span></button></div></dialog></div></>

/**
  var componentName = "wb-lbx",
    selector = "." + componentName,
    initEvent = "wb-init" + selector


            if ( $item.type === "image" ) {
              $content.find( ".mfp-bottom-bar" ).attr( "id", "lbx-title" );
            } 


          close: function() {
            $document.find( "body" ).removeClass( "wb-modal" );
            $document.find( modalHideSelector ).removeAttr( "aria-hidden" );
            this.wrap.find( "dialog" ).removeAttr( "open" );
  
          },


          change: function() {
            var $item = this.currItem,
              $content = this.contentContainer,
              $el, $bottomBar, $source, $target,
              description, altTitleId, altTitle;
  
            if ( $item.type === "image" ) {
              $el = $item.el;
              $target = $item.img;
              $bottomBar = $content.find( ".mfp-bottom-bar" );
  
              if ( $el ) {
                $source = $el.find( "img" );
                $target.attr( "alt", $source.attr( "alt" ) );
  
                // Replicate aria-describedby if it exists
                description = $source.attr( "aria-describedby" );
                if ( description ) {
                  $target.attr( "aria-describedby", description );
                }
  
                // Replicate longdesc if it exists
                description = $source.attr( "longdesc" );
                if ( description ) {
                  $target.attr( "longdesc", description );
                }
  
                // Handle alternate titles
                altTitleId = $el.attr( "data-title" );
                if ( altTitleId ) {
                  altTitle = document.getElementById( altTitleId );
                  if ( altTitle !== null ) {
                    $bottomBar.find( ".mfp-title" ).html( altTitle.innerHTML );
                  }
                }
              } else {
                $target.attr( "alt", $bottomBar.find( ".mfp-title" ).html() );
              }
            } else {
              $content
                .find( ".modal-title, h1" )
                .first()
                .attr( "id", "lbx-title" );
            }
            

    createCloseButton = function( $modal ) {
      if ( $modal !== null && $modal.hasClass( "modal-dialog" ) ) {
        var footer = $modal.find( ".modal-footer" ).first(),
          hasFooter = footer.length,
          hasButton = hasFooter && $( footer ).find( ".popup-modal-dismiss" ).length !== 0,
          closeClassFtr = "popup-modal-dismiss",
          closeTextFtr = i18nText.close,
          spanTextFtr = i18nText.oClose,
          overlayCloseFtr;
  
        if ( !hasButton ) {
          if ( !hasFooter ) {
            footer = document.createElement( "div" );
            footer.setAttribute( "class", "modal-footer" );
          }
  
          overlayCloseFtr = "<button type='button' class='btn btn-sm btn-primary pull-left " + closeClassFtr +
            "' title='" + spanTextFtr + "'>" +
            closeTextFtr +
            "<span class='wb-inv'>" + spanTextFtr + "</span></button>";
  
          $( footer ).append( overlayCloseFtr );
          if ( !hasFooter ) {
            $( footer ).insertAfter( $modal.find( ".modal-body" ) );
          }
        }
      }
    },

  
      $wrap.on( "keydown", function( e ) {
        if ( e.which === 9 ) {
          var tabbable = $wrap.find( ".mfp-container :tabbable:visible" ),
            firstTabbable = tabbable.first()[ 0 ],
            lastTabbable = tabbable.last()[ 0 ],
            currentFocus = $( document.activeElement )[ 0 ];
  
          if ( !e.shiftKey && currentFocus === lastTabbable ) {
            e.preventDefault();
            firstTabbable.focus();
          } else if ( e.shiftKey && ( currentFocus === firstTabbable || currentFocus === $wrap[ 0 ] ) ) {
            e.preventDefault();
            lastTabbable.focus();
          }
        }
      } );
    };
  
    
  // Handler for clicking on a same page link within the overlay to outside the overlay
  $document.on( "click vclick", ".mfp-wrap a[href^='#']", function( event ) {
    var which = event.which,
      eventTarget = event.currentTarget,
      $lightbox, linkTarget;
  
    // Ignore middle/right mouse buttons
    if ( !which || which === 1 ) {
      $lightbox = $( eventTarget ).closest( ".mfp-wrap" );
      linkTarget = document.getElementById( eventTarget.getAttribute( "href" ).substring( 1 ) );
  
      // Ignore same page links to within the overlay
      if ( linkTarget && !$.contains( $lightbox[ 0 ], linkTarget ) ) {
  
        // Stop propagation of the click event
        if ( event.stopPropagation ) {
          event.stopImmediatePropagation();
        } else {
          event.cancelBubble = true;
        }
  
        // Close the overlay and set focus to the same page link
        $.magnificPopup.close();
        $( linkTarget ).trigger( setFocusEvent );
      }
    }
  } );
  */
