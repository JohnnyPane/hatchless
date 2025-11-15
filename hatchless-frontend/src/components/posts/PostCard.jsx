import { Card, Group, Badge, Text } from "@mantine/core";
import HatchlessImageCarousel from "../ui/HatchlessImageCarousel.jsx";
import { formatDate } from "../../utils/dateUtils.js";

const badgeConfig = {
  User: { color: "pink", label: "User" },
  FlyShop: { color: "indigo", label: "Fly Shop" },
}

const PostCard = ({ postData }) => {
  const { attributes: post } = postData;

  const badgeInfo = badgeConfig[post.creator_type] || { color: "gray", label: "Unknown" };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 600}}>
      <Card.Section>
        <HatchlessImageCarousel images={post.image_urls} height={400} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="sm">
        <div className="flex row align-center">
          <Text size="lg" fw={500} className="margin-right">{post.creator.name}</Text>
          <Badge color={badgeInfo.color}>{badgeInfo.label}</Badge>
        </div>

        <div className="flex column align-end">
          <Text size="sm">{post.river.name}</Text>
          <Text size="sm" c="dimmed" >{formatDate(post.created_at)}</Text>
        </div>
      </Group>


      <Text className="secondary-text">
        {post.caption}
      </Text>
    </Card>
  );
}

export default PostCard;