import { Card, Image, Text, Button } from "@mantine/core";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { generateImageUrl } from "../../utils/imageUtils.js";

const HotFlyCard = ({ hotFly, editable = false }) => {
  const { fly_pattern: flyPattern, image_url } = hotFly.attributes;
  const updateHotFly = useUpdateResource('hot_flies');

  const deactivateHotFly = async (hotFlyId) => {
    try {
      await updateHotFly.mutateAsync({ id: hotFlyId, active: false });
    } catch (error) {
      console.error("Failed to deactivate hot fly:", error);
    }
  }

  return (
    <Card key={hotFly.id} shadow="md" padding="md" radius="md" withBorder className="hot-fly-card card margin">
      <div className="flex row space-between">
        <div className="flex row full-width">
          <div>
            <Image
              src={generateImageUrl(image_url)}
              alt={flyPattern.name}
              className="margin-right hot-fly-card-image"
            />
          </div>

          <div className="flex column full-width">
            <div className="flex row space-between full-width align-center">
              <Text>{hotFly.attributes.fly_pattern.name}</Text>

              {editable && <Button variant="transparent" color="gray" onClick={() => deactivateHotFly(hotFly.id)} size="xs">
                Deactivate
              </Button>}
            </div>

            <Text size="sm" className="secondary-text">{hotFly.attributes.notes}</Text>
          </div>
        </div>

      </div>
    </Card>
  );
}

export default HotFlyCard;