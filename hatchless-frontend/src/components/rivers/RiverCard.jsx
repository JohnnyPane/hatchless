import { Card, Title, Text } from "@mantine/core";

const RiverCard = ({ item, onClick }) => {
  const riverData = item;

  const handleClick = () => {
    if (onClick) {
      onClick(riverData);
    }
  }

  return (
    <Card shadow="sm" padding="md" radius="md" mb={8} withBorder className="card" onClick={handleClick}>
      <Title order={4} className="margin-4-b">{riverData.name}</Title>
      {riverData.description && <Text size="md" className="margin-bottom">{riverData.description}</Text>}
      <Text size="sm" className="secondary-text">
        Water Type: {riverData.water_type || "N/A"} <br />
        Designation: {riverData.designation || "N/A"} <br />
        Designation System: {riverData.designation_system || "N/A"} <br />
      </Text>
    </Card>
  );
}

export default RiverCard;