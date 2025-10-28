import { Card, Text, Title } from "@mantine/core";
import { formatDate } from "../../utils/dateUtils.js";


const HatchReportCard = ({ report }) => {
  const { id, author, observed_on, notes, insects } = report;

  return (
    <Card key={id} shadow="sm" padding="md" radius="md" mb={8} withBorder className="hatch-report-card">
      <div className="flex row align-end space-between margin-4-b">
        <Title order={5}>{author}</Title>
        <Text size="sm" color="dimmed" className="italic margin-left">
          {formatDate(observed_on)}
        </Text>
      </div>

      <Text size="sm" className="margin-bottom">{notes}</Text>

      {insects && <div className="flex row align-center">
        <Text className="bold" size="sm">Insects:</Text>

        {insects.map((insect, index) => (
          <div key={index} className="margin-left">
            <Text size="xs" color="dimmed">{insect.common_name} </Text>
          </div>
        ))}
      </div>}
    </Card>
  )
 }

export default HatchReportCard;