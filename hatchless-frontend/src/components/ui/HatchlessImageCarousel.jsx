import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { generateImageUrl } from "../../utils/imageUtils.js";

const HatchlessImageCarousel = ({ images, height = 300, badge = null }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const slides  = images.map((image, index) => (
    <Carousel.Slide key={index} className="relative">
      <Image
        src={generateImageUrl(image.image_url)}
        alt={image.alt || `Image ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {badge}
    </Carousel.Slide>
  ));

  const showIndicators = images.length > 1;

  return (
    <Carousel
      slideSize="100%"
      slideGap="md"
      align="start"
      loop
      withIndicators={showIndicators}
      withControls={false}
      height={height}
      styles={{
        viewport: {
          // maxWidth: 400,
          margin: '0 auto',
        },
      }}
      className="relative"
    >
      {slides}
    </Carousel>
  );
}

export default HatchlessImageCarousel;