import { Card, Text, Group, Badge, Stack, Box, Image } from '@mantine/core';
import HatchlessImageCarousel from '../ui/HatchlessImageCarousel.jsx';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const badgeConfig = {
  User: { color: "pink", label: "User" },
  FlyShop: { color: "indigo", label: "Fly Shop" }
}

const PostCard = ({ postData }) => {
  if (!postData) return null;
  const { attributes: post } = postData;
  const badgeInfo = badgeConfig[post.creator_type] || { color: "gray", label: "Member" };

  return (
    <Card
      shadow="sm"
      padding="0"
      radius="md"
      withBorder
      style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
    >
      <Card.Section>
        <HatchlessImageCarousel images={post.image_urls} />
      </Card.Section>

      <Box p="md">
        <Group justify="space-between" align="flex-start" mb="sm" wrap="nowrap">
          <Stack gap={2}>
            <Group gap="xs" align="center" justify="center">
              <Text fw={700} size="lg">{post.creator.name}</Text>

              <Badge color={badgeInfo.color} variant="outline" size="sm">
                {badgeInfo.label}
              </Badge>
            </Group>

            <Text size="md" c="dimmed">{post.river.name}</Text>
          </Stack>

          <Text size="sm" c="dimmed">{formatDate(post.created_at)}</Text>
        </Group>

        <Text size="lg" style={{ whiteSpace: 'pre-line' }}>
          {post.caption}
        </Text>
      </Box>
    </Card>
  );
};

export default PostCard;