import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { Title } from "@mantine/core";
import HatchReportCard from "../hatchReports/HatchReportCard.jsx";

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
          <HatchReportCard key={report.id} report={report.attributes} />
        ))}
      </div>
    </div>
  );
}

export default HatchReports;