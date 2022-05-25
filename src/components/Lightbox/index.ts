import OriginLightbox from './Lightbox';
import LightboxGallery from './LightboxGallery';

export type LightboxProps = typeof OriginLightbox & {
  Gallery: typeof LightboxGallery;
};

const Lightbox = OriginLightbox as LightboxProps;

Lightbox.Gallery = LightboxGallery;

export default Lightbox;
