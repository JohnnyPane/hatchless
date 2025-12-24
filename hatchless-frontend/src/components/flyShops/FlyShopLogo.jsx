import { Card, Image } from '@mantine/core';
import { generateImageUrl } from "../../utils/imageUtils.js";

const FlyShopLogo = ({ url, name, onClick, size = 60 }) => {
  const displayURL = generateImageUrl(url);

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className="clickable"
      onClick={onClick}
      w={size}
      h={size}
      p={size * 0.15}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Image
        src={displayURL}
        alt={name}
        fit="contain"
        w="100%"
        h="100%"
        fallbackSrc={`https://placehold.co/80x80?text=${name}&font=roboto`}
      />
    </Card>
  );
}

export default FlyShopLogo;