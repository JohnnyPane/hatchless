import { Card, Image, Text, Button, Group, Stack, Box } from "@mantine/core";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { generateImageUrl } from "../../utils/imageUtils.js";

const HotFlyCard = ({ item, editable = false }) => {
  const hotFly = item;
  const { fly_pattern: flyPattern, image_url } = hotFly;
  const updateHotFly = useUpdateResource('hot_flies');

  const deactivateHotFly = async (hotFlyId) => {
    try {
      await updateHotFly.mutateAsync({ id: hotFlyId, active: false });
    } catch (error) {
      console.error("Failed to deactivate hot fly:", error);
    }
  }

  return (
    <Card
      shadow="lg"
      withBorder
      padding="sm"
      radius="md"
      className="hot-fly-card card margin"
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '10px auto'
      }}
    >
      <Group wrap="nowrap" align="flex-start">
        <Box style={{ flexShrink: 0 }}>
          <Image
            src={generateImageUrl(image_url)}
            alt={flyPattern.name}
            radius="sm"
            style={{
              width: 70,
              height: 70,
              objectFit: 'cover'
            }}
          />
        </Box>

        <Stack gap={4} style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap" align="center">
            <Text fw={600} size="sm" lineClamp={1}>
              {flyPattern.name}
            </Text>

            {editable && (
              <Button
                variant="subtle"
                color="gray"
                onClick={() => deactivateHotFly(hotFly.id)}
                size="compact-xs"
              >
                Deactivate
              </Button>
            )}
          </Group>

          <Text size="xs" c="dimmed" lineClamp={3}>
            {hotFly.notes}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}

export default HotFlyCard;