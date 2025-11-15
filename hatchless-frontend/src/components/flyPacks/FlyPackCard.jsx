import { Card, Title, Text, Badge } from "@mantine/core";
import HatchlessImageCarousel from "../ui/HatchlessImageCarousel.jsx";

const FlyPackCard = ({ flyPackAttributes }) => {
  const { id, attributes: flyPack } = flyPackAttributes;

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder key={id} className="card" w={320} mb={20}>
      <Card.Section>
        <HatchlessImageCarousel images={flyPack.image_urls} height={240} />
      </Card.Section>

      <div className="flex column space-between full-height margin-4-t">
        <div className="margin-4-t">
          <div className="flex space-between align-center">
            <Title order={3}>{flyPack.name}</Title>

            <Text weight={500}>${(flyPack.price_cents / 100).toFixed(2)}</Text>
          </div>

          <Text className="secondary-text margin-bottom" size="sm">{flyPack.description}</Text>

          { flyPack.fly_pack_items && flyPack.fly_pack_items.length > 0 && (
            <div className="">
              {flyPack.fly_pack_items.map((item) => (
                <Text key={item.id}>
                  {item.fly_pattern.name} x {item.quantity}
                </Text>
              ))}
            </div>
          )}
        </div>

        <div className="flex row margin-top">
          {/*<Text size="sm" className="margin-4-r">Fish: </Text>*/}

          <div className="flex row wrap">
            {flyPack.fish && flyPack.fish.length > 0 ? (
              flyPack.fish.map((fish) => (
                <Badge color="blue" variant="outline" className="margin-4-r margin-4-b" key={fish.id} style={{ textTransform: "none" }}>
                  {fish.common_name}
                  {/*<Text className="margin-8-r secondary-text" size="sm" key={fish.id}>{fish.common_name}</Text>*/}
                </Badge>
              ))
            ) : (
              <Text className="margin-right secondary-text" size="sm">No fish species referenced</Text>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FlyPackCard;