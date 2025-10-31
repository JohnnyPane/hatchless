import { Button, Card, Image, Text } from "@mantine/core";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { getFlyDefaultImageUrl } from "../../utils/imageUtils.js";

const HotFlyCard = ({ hotFly, editable = false }) => {
  const { fly_pattern: flyPattern } = hotFly.attributes;
  const updateHotFly = useUpdateResource('hot_flies');

  const deactivateHotFly = async (hotFlyId) => {
    try {
      await updateHotFly.mutateAsync({ id: hotFlyId, active: false });
    } catch (error) {
      console.error("Failed to deactivate hot fly:", error);
    }
  }

  const imageUrl = flyPattern.image_url || getFlyDefaultImageUrl(flyPattern.category);

  return (
    <Card key={hotFly.id} shadow="md" padding="md" radius="md" withBorder className="hot-fly-card card margin">
      <div className="flex row space-between">
        <div className="flex row">
          <Image
            src={imageUrl}
            alt={flyPattern.name}
            w={64}
            h={64}
            className="margin-right"
          />

          <div className="flex column">
            <Text>{hotFly.attributes.fly_pattern.name}</Text>
            <Text size="sm" className="secondary-text">{hotFly.attributes.notes}</Text>
          </div>
        </div>

        <div className="flex to-right">
          {editable && <Button variant="subtle" color="gray" onClick={() => deactivateHotFly(hotFly.id)} size="xs">
            Deactivate
          </Button>}
        </div>

      </div>
    </Card>
  );
}

export default HotFlyCard;