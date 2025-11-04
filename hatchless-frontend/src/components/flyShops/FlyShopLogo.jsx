import {Box, Card, Image} from '@mantine/core';

const  FlyShopLogo = ({ url, name, onClick, size = 60 }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <Card shadow="md" radius="md" withBorder className="clickable" onClick={handleClick} w={size} h={size}>
      <Card.Section>
        <Image
          src={url}
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