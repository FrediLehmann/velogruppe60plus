import { chakra } from '@chakra-ui/react';
import Image from 'next/image';

const MapImage = chakra(Image, {
  shouldForwardProp: prop =>
    [
      'height',
      'width',
      'quality',
      'src',
      'alt',
      'fill',
      'placeholder'
    ].includes(prop)
});

export default MapImage;
