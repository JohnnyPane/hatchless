import { Link } from "react-router-dom";
import { Drawer, Title, Text, Card, Image, Button } from '@mantine/core';
import { getFlyDefaultImageUrl } from "../../utils/imageUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

const HotFlyDrawer = ({ isOpen, onClose, hotFly }) => {
  const imageUrl = hotFly?.fly_pattern?.image_url || getFlyDefaultImageUrl(hotFly?.fly_pattern?.category);

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title={<Text size="lg" className="bold">{hotFly?.fly_pattern?.name}</Text>}
      padding="md"
      position="right"
      size="md"
    >
      {hotFly && <div>
        <div className="flex column align-center">
          <Card shadow="md" radius="md">
            <Card.Section>
              <Image src={imageUrl} alt={hotFly.fly_pattern.name} w={300} h={300} radius={8} />
            </Card.Section>
          </Card>
        </div>

        <div>
          <Title order={4} className="margin-top margin-bottom center-text">Fly Pattern Details</Title>
          {hotFly.min_size && <Text>
            <strong>Size: </strong>
            <Text span>
              {hotFly.min_size}-{hotFly.max_size}
            </Text>
          </Text>}

          <Text><strong>Notes: </strong>
            <Text span>
              {hotFly.notes}
            </Text>
          </Text>

          <Text><strong>Category: </strong>
            <Text span>
              {hotFly.fly_pattern.category}
            </Text>
          </Text>

          <Text><strong>Posted On: </strong>
            <Text span>
              {formatDate(hotFly.created_at)}
            </Text>
          </Text>


          <div className="flex row align-end margin-4-t">
            <Text><strong>Fly Shop:</strong></Text>

            <Button component={Link} to={`/fly_shops/${hotFly.fly_shop.id}`} size="compact-xs" variant="transparent" className="animated-link" color="indigo">
              <Text color="indigo">{hotFly.fly_shop.name}</Text>
            </Button>
          </div>

          <div className="flex row align-end margin-4-t">
            <Text><strong>Website: </strong>   </Text>

            <Button component={Link} to={hotFly.fly_shop.website_url} target="_blank" size="compact-xs" variant="transparent" className="animated-link" color="indigo">
              <Text color="indigo">{hotFly.fly_shop.website_url}</Text>
            </Button>
          </div>
        </div>
      </div>}
    </Drawer>
  );
}

export default HotFlyDrawer;