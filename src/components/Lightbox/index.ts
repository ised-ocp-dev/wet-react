import OriginLightbox from './Lightbox';
import LightboxGallery from './LightboxGallery';
import LightboxContent from './LightboxContent';

export type LightboxProps = typeof OriginLightbox & {
  Gallery: typeof LightboxGallery;
  Content: typeof LightboxContent;
};

const Lightbox = OriginLightbox as LightboxProps;

Lightbox.Gallery = LightboxGallery;
Lightbox.Content = LightboxContent;

export default Lightbox;
