import { Card, Image, Text, Title, Group, Stack, Box } from "@mantine/core";
import { generateImageUrl } from "../../utils/imageUtils.js";

const FlyShopCard = ({ item, onClick }) => {
  const flyShop = item;
  const imageUrl = generateImageUrl(flyShop.logo_url);

  return (
    <Card
      shadow="xs"
      padding="sm"
      radius="md"
      onClick={() => onClick(item)}
      className="card clickable "
    >
      <Group wrap="nowrap" align="flex-start">
        <Box
          style={{
            width: 80,
            height: 80,
            minWidth: 80,
            borderRadius: '8px',
            backgroundColor: '#F8F9FA',
            border: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '4px'
          }}
        >
          <Image
            src={imageUrl}
            alt={flyShop.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            fallbackSrc={`https://placehold.co/80x80?text=${flyShop.name.charAt(0)}&font=roboto`}
          />
        </Box>

        <Stack gap={2} style={{ flex: 1 }}>
          <Title order={4} size="sm" style={{ lineHeight: 1.2 }}>
            {flyShop.name}
          </Title>

          <Text size="xs" color="dimmed" lineClamp={2}>
            {flyShop.description}
          </Text>

          <Text size="xs" fw={500} mt={4}>
            {flyShop.website_url}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default FlyShopCard;