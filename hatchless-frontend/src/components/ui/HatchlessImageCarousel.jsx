import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { generateImageUrl } from "../../utils/imageUtils.js";

const HatchlessImageCarousel = ({ images, height = 300 }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const slides  = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <Image
        src={generateImageUrl(image.image_url)}
        alt={image.alt || `Image ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      slideGap="md"
      align="start"
      loop
      withIndicators
      height={height}
      styles={{
        viewport: {
          // maxWidth: 400,
          margin: '0 auto',
        },
      }}
    >
      {slides}
    </Carousel>
  );
}

export default HatchlessImageCarousel;