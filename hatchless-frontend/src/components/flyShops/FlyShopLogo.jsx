import { Card, Image } from '@mantine/core';
import { generateImageUrl } from "../../utils/imageUtils.js";

const  FlyShopLogo = ({ url, name, onClick, size = 60 }) => {
  const displayURL = generateImageUrl(url)
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <Card shadow="md" radius="md" withBorder className="clickable" onClick={handleClick} w={size} h={size}>
      <Card.Section>
        <Image
          src={displayURL}
          alt={name}
          h={size}
          w={size}
          fit="contain"
        />
      </Card.Section>
    </Card>
  );
}

export default FlyShopLogo;