import { Title, Text } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchReportCard from "../hatchReports/HatchReportCard.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";
import AddHatchReport from "../hatchReports/AddHatchReport.jsx";

const MyHatchReports = () => {
  const { data: hatchReports, total } = useResourceContext();

  return (
    <div className="page">
      <Title order={2} className="margin-bottom">Hatch Reports</Title>

      <AddHatchReport />

      <div className="flex column align-center">
        <Text size="xs" color="dimmed" className="italic margin-4-b">Total Hatch Reports: {total}</Text>

        {hatchReports.map((report) => (
          <HatchReportCard key={report.id} report={report.attributes} className="my-hatch-report-card" />
        ))}
      </div>

      <div className="flex to-center margin-top margin-bottom">
        <HatchlessPagination resourceName="hatch_reports" />
      </div>
    </div>
  );
}

export default MyHatchReports;