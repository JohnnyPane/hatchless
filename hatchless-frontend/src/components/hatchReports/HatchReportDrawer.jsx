import { Drawer, Title, Button } from '@mantine/core';
import { useForm } from "@mantine/form";
import { DatePicker } from '@mantine/dates';

import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";

const HatchReportDrawer = ({ opened, onClose, hatchReport }) => {
  const updateHatchReport = useUpdateResource('hatch_reports');

  const form = useForm({
    initialValues: {
      observed_on: hatchReport?.observed_on || '',
      insect_ids: hatchReport?.insect_ids || [],
    },
  });

  const onInsectSelect = (insectIds) => {
    form.setFieldValue('insect_ids', insectIds);
  }

  const onDateChange = (date) => {
    form.setFieldValue('observed_on', date);
  }

  const onSubmit = async (values) => {
    try {
      await updateHatchReport.mutateAsync({ id: hatchReport.id, ...values });
      onClose();
    } catch (error) {
      console.error("Failed to update hatch report:", error);
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Hatch Report Details"
      padding="md"
      size="md"
      position="right"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="flex column">
          <div className="margin-bottom">
            <Title order={5}>Hatches Observed</Title>
            <HatchlessSearch onChange={onInsectSelect} nameKey='common_name' searchType='multiSelect' />
          </div>

          <div className="margin-top">
            <Title order={5}>Observed On</Title>
            <DatePicker onChange={onDateChange} value={form.values.observed_on} color="indigo" />
          </div>
        </div>

        <Button type="submit" color="indigo" className="full-width double-margin-top">Save Changes</Button>
      </form>
    </Drawer>
  );
};

export default HatchReportDrawer;