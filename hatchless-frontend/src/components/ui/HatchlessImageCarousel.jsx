import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { generateImageUrl } from "../../utils/imageUtils.js";

const HatchlessImageCarousel = ({ images, badge = null }) => {
  if (!images || images.length === 0) return null;

  const slides = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        <Image
          src={generateImageUrl(image.image_url)}
          alt={image.alt || `Image ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {badge}
      </div>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      loop
      withIndicators={images.length > 1}
      withControls={false}
      styles={{
        root: {
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: '#F1F3F5',
        },
        viewport: { height: '100%' },
        container: { height: '100%' }
      }}
    >
      {slides}
    </Carousel>
  );
}

export default HatchlessImageCarousel;