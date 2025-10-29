import { Title, Text } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";
import HatchReportCard from "../hatchReports/HatchReportCard.jsx";

const HatchReports = () => {
  const { data: hatchReports, isLoading, isError, error, total } = useResourceContext();

  // if (isLoading) return <div>Loading hatch reports...</div>;
  // if (isError) return <div>Error loading hatch reports: {error.message}</div>;
  if (!hatchReports || hatchReports.length === 0) return <div className="flex to-center margin-80-t margin-80-b">No hatch reports available.</div>;

  return (
    <>
      <div className="flex row space-between align-end margin-4-b">
        <Title order={4}>Hatch Reports</Title>
        <Text color="dimmed" size="xs" className="margin-4-r">Total: {total}</Text>
      </div>

      <div>
        {hatchReports.map((report) => (
          <HatchReportCard key={report.id} report={report.attributes} />
        ))}
      </div>

      <div className="flex to-center margin">
        <HatchlessPagination />
      </div>
    </>
  );
}

export default HatchReports;