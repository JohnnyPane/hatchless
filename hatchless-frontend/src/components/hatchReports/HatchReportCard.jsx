import { Card, Text, Title } from "@mantine/core";
import { formatDate } from "../../utils/dateUtils.js";


const HatchReportCard = ({ report, className }) => {
  const { id, author, observed_on, notes, insects } = report;

  return (
    <Card key={id} shadow="sm" padding="md" radius="md" mb={8} withBorder className={className + " card"}>
      <div className="flex row align-end space-between margin-4-b">
        <div className="flex row align-center">
          <Title order={4} className="margin-4-r">{author.name}</Title>
          <Text size="md" className="secondary-text">{author.type}</Text>
        </div>

        <Text size="sm" className="secondary-text italic margin-left">
          {formatDate(observed_on)}
        </Text>
      </div>

      <Text size="md" className="margin-bottom">{notes}</Text>

      {insects && <div className="flex row align-center">
        <Text className="bold" size="sm">Insects:</Text>

        {insects.map((insect, index) => (
          <div key={index} className="margin-left">
            <Text size="sm" className="secondary-text">{insect.common_name} </Text>
          </div>
        ))}
      </div>}
    </Card>
  )
 }

export default HatchReportCard;