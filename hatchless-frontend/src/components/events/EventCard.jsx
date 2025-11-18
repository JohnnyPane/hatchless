import {Image, Card, Title, Text, Badge} from "@mantine/core";
import { generateImageUrl } from "../../utils/imageUtils.js";
import { formatDateTime } from "../../utils/dateUtils.js";
import { formatPriceInCents } from "../../utils/railsDisplayFormatters.js";

const EventCard = ({ event }) => {
  const { attributes: eventAttrs } = event;

  const imageUrl = generateImageUrl(eventAttrs.image_url);

  return (
    <Card shadow="sm" padding="lg" className="" style={{ width: 600}}>
      <Card.Section>
        <Image src={imageUrl} alt={event.title} height={300} />
      </Card.Section>

      <div className="flex row space-between margin-top">
        <div className="flex row align-center">
          <Title order={2} className="margin-right">{eventAttrs.name}</Title>

          <Badge
            size="lg"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "var(--color-bone)",
              textTransform: "none",
            }}
          >
            {eventAttrs.fly_shop.name}
          </Badge>
        </div>
        <Text size="lg" className="secondary-text ">{formatPriceInCents(eventAttrs.price_cents)}</Text>
      </div>

      <Text className="secondary-text margin-bottom">{eventAttrs.description}</Text>


      <Text className="margin-4-t">Location: {eventAttrs.location}</Text>

      <Text size="sm" c="dimmed" className="margin-top-sm">
        {formatDateTime(eventAttrs.start_time)} - {formatDateTime(eventAttrs.end_time)}
      </Text>
    </Card>
  );
};

export default EventCard;