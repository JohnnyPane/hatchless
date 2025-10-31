import { Card, Text, Title } from '@mantine/core';

const InsectListItem = ({ insect }) => {

  return (
    <Card shadow="sm" padding="lg" radius="md" mb={8} withBorder className="card">
      <div className="insect-list-item">

        <div className="flex row space-between align-center">
          <Title order={4}>{insect.common_name}</Title>
          {insect.min_size && insect.max_size && (
            <Text size="xs" className="secondary-text">
              Size: {insect.min_size} - {insect.max_size}
            </Text>
          )}
        </div>

        <div className="margin-bottom">
          <Text className="secondary-text italic">{insect.scientific_name}</Text>
        </div>

        {insect.description && <Text>Description {insect.description}</Text>}

        <Title order={6}>Related Fly Patterns</Title>
        {insect.fly_patterns && insect.fly_patterns.length > 0 ? (
          <div>
            {insect.fly_patterns.map((fly, index) => (
              <div key={index} className="flex row space-between">
                <Text size="sm">{fly.name}</Text>
                {/*<p><strong>Category:</strong> {fly.category}</p>*/}
                <Text size="xs" className="secondary-text">{fly.category}</Text>
              </div>
            ))}
          </div>
        ) : (
          <p>No fly patterns available.</p>
        )}
      </div>
    </Card>
  );
}

export default InsectListItem;
