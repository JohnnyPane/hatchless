import { Card, Image, Text, Title, Badge, Group, Stack, Box } from '@mantine/core';
import { generateImageUrl } from "../../utils/imageUtils.js";
import { formatEventTimes } from "../../utils/dateUtils.js";
import { formatPriceInCents } from "../../utils/railsDisplayFormatters.js";

const EventCard = ({ event }) => {
  const { attributes: eventAttrs } = event;
  const imageUrl = generateImageUrl(eventAttrs.image_url);

  const secondaryColor = "#495057";

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: "#F9F9F7",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card.Section>
        <Image
          src={imageUrl}
          alt={eventAttrs.name}
          fallbackSrc="https://placehold.co/600x300?text=No+Image+Available"
          style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
        />
      </Card.Section>

      <Stack mt="xs" gap="0">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Title order={3} c="black" style={{ lineHeight: 1.2 }}>
            {eventAttrs.name}
          </Title>
          <Text fw={700} size="lg" c="blue.7">
            {formatPriceInCents(eventAttrs.price_cents)}
          </Text>
        </Group>

        <Stack gap={2}>
          <Text size="md">
            <Text span fw={700} c="black" mr={4}>Location:</Text>
            <Text span c={secondaryColor}>{eventAttrs.location}</Text>
          </Text>

          <Text size="md">
            <Text span fw={700} c="black" mr={4}>Time:</Text>
            <Text span c={secondaryColor}>
              {formatEventTimes(eventAttrs.start_time, eventAttrs.end_time)}
            </Text>
          </Text>

          <Text size="md">
            <Text span fw={700} c="black" mr={4}>Description:</Text>
            <Text span c={secondaryColor}>
              {eventAttrs.description}
            </Text>
          </Text>
        </Stack>

        <Group justify="center" mt="lg">
          <Badge
            variant="filled"
            color="gray.8"
            radius="sm"
            size="xl"
            style={{ textTransform: "none", fontWeight: 600 }}
          >
            {eventAttrs.fly_shop.name}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default EventCard;