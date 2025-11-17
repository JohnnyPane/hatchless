import { Card, Title, Text, Badge, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import HatchlessImageCarousel from "../ui/HatchlessImageCarousel.jsx";
import { notifications } from "@mantine/notifications";
import EditFlyPackForm from "./EditFlyPackForm.jsx";

const FlyPackCard = ({ flyPackAttributes, editable = false }) => {
  const { id, attributes: flyPack } = flyPackAttributes;
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const { mutate: updateFlyPack } = useUpdateResource('fly_packs');

  const toggleActive = () => {
    updateFlyPack({ id, active: !flyPack.active });
    notifications.show({
      title: 'Success',
      message: `${flyPack.name} has been ${flyPack.active ? 'deactivated' : 'activated'}.`,
      color: 'green',
      position: 'top-right',
    });
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder key={id} className="card" w={320} mb={20}>
      <Card.Section>
        <HatchlessImageCarousel
          images={flyPack.image_urls}
          height={240}
          badge={ <Badge
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "var(--color-bone)",
              textTransform: "none",
            }}
          >
            {flyPack.fly_shop.name}
          </Badge>}
        />
      </Card.Section>

      <div className="flex column space-between full-height margin-4-t">
        <div className="margin-4-t">
          <div className="flex space-between align-center">
            <Title order={3}>{flyPack.name}</Title>

            <Text weight={500}>${(flyPack.price_cents / 100).toFixed(2)}</Text>
          </div>

          <Text className="margin-bottom secondary-text" size="sm">{flyPack.description}</Text>

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

        <div className="flex column">
          <div className="flex row wrap margin-top">
            {flyPack.fish && flyPack.fish.length > 0 ? (
              flyPack.fish.map((fish) => (
                <Badge color="blue" variant="outline" className="margin-4-r margin-4-b" key={fish.id} style={{ textTransform: "none" }}>
                  {fish.common_name}
                </Badge>
              ))
            ) : (
              <Text className="margin-right secondary-text" size="sm">No fish species referenced</Text>
            )}
          </div>

          {editable &&
            <div className="flex row space-between">
              <Button
                variant="subtle"
                color="blue"
                className="margin-4-t"
                size="compact-xs"
                onClick={openDrawer}
              >
                Edit Fly Pack
              </Button>

              <Button
                color={flyPack.active ? 'red' : 'green'}
                variant="subtle"
                className="margin-4-t"
                size="compact-xs"
                onClick={toggleActive}
              >
                {flyPack.active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>}
        </div>
      </div>

      <Drawer opened={drawerOpened} onClose={closeDrawer} title={flyPack.name} padding="xl" position="right" size="lg">
        <EditFlyPackForm onSuccess={closeDrawer} flyPackId={id} />
      </Drawer>
    </Card>
  );
}

export default FlyPackCard;