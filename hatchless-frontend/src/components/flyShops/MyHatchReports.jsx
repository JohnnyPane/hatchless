import { useState } from "react";
import { Textarea, Button, Title, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateResource } from "../../hooks/useResourceMutations.js";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchReportDrawer from "../hatchReports/HatchReportDrawer.jsx";
import HatchReportCard from "../hatchReports/HatchReportCard.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";

const MyHatchReports = () => {
  const [newHatchReport, setNewHatchReport] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: hatchReports, total } = useResourceContext();
  const createHatchReport = useCreateResource('hatch_reports');

  const form = useForm({
    initialValues: {
      observed_on: '',
      notes: '',
      insect_ids: [],
    },
  });

  const addHatchReport = async () => {
    const payload = {
      observed_on: form.values.observed_on,
      notes: form.values.notes,
      insect_ids: form.values.insect_ids,
    }

    try {
      const newReport = await createHatchReport.mutateAsync(payload);
      setNewHatchReport(newReport);
      open();
      form.reset();
    } catch (error) {
      console.error("Failed to add hatch report:", error);
    }
  }

  const closeHatchReportDrawer = () => {
    setNewHatchReport(null);
    close();
  }

  return (
    <div className="page">
      <Title order={2} className="margin-bottom">Hatch Reports</Title>
      <div className="flex column align-center margin-bottom">
        <div className="hatch-report-card">
          <Textarea
            label="Add New Hatch Report"
            placeholder="Enter hatch report notes"
            minRows={4}
            {...form.getInputProps('notes')}
          />

          <div className="flex to-right margin-4-t">
            <Button color="indigo" variant="light" disabled={form.values.notes.length === 0} onClick={addHatchReport}>Add Hatch Report</Button>
          </div>
        </div>
      </div>


      <div className="flex column align-center">
        <Text size="xs" color="dimmed" className="italic margin-4-b">Total Hatch Reports: {total}</Text>

        {hatchReports.map((report) => (
          <HatchReportCard key={report.id} report={report.attributes} />
        ))}
      </div>

      <div className="flex to-center margin-top margin-bottom">
        <HatchlessPagination resourceName="hatch_reports" />
      </div>

      {newHatchReport && (
        <ResourceProvider resourceName="insects" initialParams={{ searchColumn: "common_name" }}>
          <HatchReportDrawer hatchReport={newHatchReport} opened={opened} onClose={closeHatchReportDrawer} />
        </ResourceProvider>
      )}
    </div>
  );
}

export default MyHatchReports;