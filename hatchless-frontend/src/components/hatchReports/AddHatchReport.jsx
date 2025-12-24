import { useState } from "react";
import { Button, Textarea, Box, Card, Stack, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { useCreateResource } from "../../hooks/useResourceMutations.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchReportDrawer from "./HatchReportDrawer.jsx";


const AddHatchReport = ({ riverId = null }) => {
  const [newHatchReport, setNewHatchReport] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 576px)', false, {
    getInitialValueInEffect: true,
  });

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
    <Box mb="md">
      <Stack gap="sm">
        <Textarea
          label="Add New Hatch Report"
          placeholder="Enter hatch report notes"
          minRows={isMobile ? 3 : 4}
          autosize
          {...form.getInputProps('notes')}
          styles={{
            input: {
              fontSize: '16px'
            }
          }}
        />

        <Button
          fullWidth={isMobile}
          disabled={form.values.notes.length === 0}
          onClick={addHatchReport}
          style={{ alignSelf: isMobile ? 'stretch' : 'flex-end' }}
        >
          Add Hatch Report
        </Button>
      </Stack>

      <ResourceProvider resourceName="insects" initialParams={{ searchColumn: "common_name" }}>
        <HatchReportDrawer
          hatchReport={newHatchReport}
          opened={opened}
          onClose={closeHatchReportDrawer}
        />
      </ResourceProvider>
    </Box>
  )
};

export default AddHatchReport;