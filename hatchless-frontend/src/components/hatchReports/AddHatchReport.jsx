import { useState } from "react";
import { Button, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { useCreateResource } from "../../hooks/useResourceMutations.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchReportDrawer from "./HatchReportDrawer.jsx";


const AddHatchReport = ({ riverId = null }) => {
  const [newHatchReport, setNewHatchReport] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

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
      river_id: riverId,
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
    <div className="flex column align-center margin-bottom">
      <div className="my-hatch-report-card">
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


      <ResourceProvider resourceName="insects" initialParams={{ searchColumn: "common_name" }}>
        <HatchReportDrawer hatchReport={newHatchReport} opened={opened} onClose={closeHatchReportDrawer} />
      </ResourceProvider>
    </div>
  )
};

export default AddHatchReport;