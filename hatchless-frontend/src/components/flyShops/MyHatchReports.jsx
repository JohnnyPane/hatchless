import { Container, Stack, Group, Title, Text } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchReportCard from "../hatchReports/HatchReportCard.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";
import AddHatchReport from "../hatchReports/AddHatchReport.jsx";

const MyHatchReports = () => {
  const { data: hatchReports, total } = useResourceContext();

  return (
    <div className="page">
      <Container size="sm" px="xs">
        <Title order={2} mb="md">Hatch Reports</Title>

        <AddHatchReport />

        <Stack align="stretch" gap="xs">
          <Text size="xs" ta="center" c="dimmed" italic>
            Total Hatch Reports: {total}
          </Text>

          {hatchReports.map((report) => (
            <HatchReportCard
              key={report.id}
              report={report.attributes}
              className="my-hatch-report-card"
            />
          ))}
        </Stack>

        <Group justify="center" mt="xl" mb="xl">
          <HatchlessPagination resourceName="hatch_reports" />
        </Group>
      </Container>
    </div>
  );
}

export default MyHatchReports;