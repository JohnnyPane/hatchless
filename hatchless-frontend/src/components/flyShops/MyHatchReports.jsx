import { useState } from "react";
import { Textarea, Button, Title, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCreateResource } from "../../hooks/useResourceMutations.js";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchReportDrawer from "../hatchReports/HatchReportDrawer.jsx";

const MyHatchReports = () => {
  const [newHatchReport, setNewHatchReport] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: hatchReports } = useResourceContext();
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
    <div>
      <Title order={2}>My Hatch Reports</Title>
      <div style={{ marginBottom: '20px' }}>
        <Textarea
          label="Notes"
          placeholder="Enter hatch report notes"
          minRows={4}
          {...form.getInputProps('notes')}
        />
        <Button mt="sm" onClick={addHatchReport}>Add Hatch Report</Button>
      </div>
      {hatchReports && hatchReports.length > 0 ? (
        hatchReports.map((report) => (
          <div key={report.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
            <Text><strong>Observed On:</strong> {report.attributes.observed_on}</Text>
            <Text><strong>Notes:</strong> {report.attributes.notes}</Text>
          </div>
        ))
      ) : (
        <Text>No hatch reports available.</Text>
      )}

      {newHatchReport && (
        <ResourceProvider resourceName="insects" initialParams={{ searchColumn: "common_name" }}>
          <HatchReportDrawer hatchReport={newHatchReport} opened={opened} onClose={closeHatchReportDrawer} />
        </ResourceProvider>
      )}
    </div>
  );
}

export default MyHatchReports;