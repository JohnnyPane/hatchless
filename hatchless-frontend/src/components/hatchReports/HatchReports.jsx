import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { Title, Text, Card } from "@mantine/core";
import {formatDate} from "../../utils/dateUtils.js";

const HatchReports = () => {
  const { data: hatchReports, isLoading, isError, error } = useResourceContext();

  if (isLoading) return <div>Loading hatch reports...</div>;
  if (isError) return <div>Error loading hatch reports: {error.message}</div>;
  if (!hatchReports || hatchReports.length === 0) return <div>No hatch reports available.</div>;
  
  return (
    <div>
      <Title order={4} className="margin-4-b">Hatch Reports</Title>
      <div>
        {hatchReports.map((report) => (
          <Card key={report.id} shadow="sm" padding="md" radius="md" mb={8} withBorder className="hatch-report-card">
            <div className="flex row align-bottom space-between margin-4-b">
              <Title order={5}>{report.attributes.author}</Title>
              <Text size="sm" color="dimmed" className="italic margin-left">
                {formatDate(report.attributes.observed_on)}
              </Text>
            </div>

            <Text size="sm" className="margin-bottom">{report.attributes.notes}</Text>

            {report.attributes.insects && <div className="flex row align-center">
              <Text className="bold" size="sm">Insects:</Text>

              {report.attributes.insects.map((insect, index) => (
                <div key={index} className="margin-left">
                  <Text size="xs" color="dimmed">{insect.common_name} </Text>
                </div>
              ))}
            </div>}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HatchReports;