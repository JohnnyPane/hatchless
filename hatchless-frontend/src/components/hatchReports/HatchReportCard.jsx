import { Card, Text, Title, Group, Stack, Badge, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { formatDate } from "../../utils/dateUtils.js";

const badgeConfig = {
  "User": { color: "pink", label: "User" },
  "Fly Shop": { color: "indigo", label: "Fly Shop" }
}

const HatchReportCard = ({ report, className }) => {
  const { id, author, observed_on, notes, insects } = report;

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card
      key={id}
      shadow="sm"
      padding="md"
      radius="md"
      mb={8}
      style={{ width: '100%' }}
      withBorder
      className={`${className} card`}
    >
      <Group justify="space-between" align="flex-start" mb="xs" wrap="nowrap">
        <Stack gap={0}>
          <Group gap="xs" align="center">
            <Title order={5} style={{ lineHeight: 1.2 }}>
              {author.name}
            </Title>
            <Badge size="sm" color={badgeConfig[author.type]?.color || "gray"} variant="transparent">
              {author.type}
            </Badge>
          </Group>

          {isMobile && (
            <Text size="sm" c="dimmed" italic mt={2}>
              Observed {formatDate(observed_on)}
            </Text>
          )}
        </Stack>

        {!isMobile && (
          <Text size="sm" c="dimmed" italic>
            {formatDate(observed_on)}
          </Text>
        )}
      </Group>

      <Text size="md" mb="md" style={{ lineHeight: 1.5 }}>
        {notes}
      </Text>

      {insects && insects.length > 0 && (
        <Box pt="xs" style={{ borderTop: '1px solid #eee' }}>
          <Group gap={6} wrap="wrap">
            <Text fw={700} size="sm">
              Insects:
            </Text>
            {insects.map((insect, index) => (
              <Badge key={index} variant="dot" color="#d9480f" size="lg" radius="lg" style={{ textTransform: 'none' }}>
                {insect.common_name}
              </Badge>
            ))}
          </Group>
        </Box>
      )}
    </Card>
  );
};

export default HatchReportCard;