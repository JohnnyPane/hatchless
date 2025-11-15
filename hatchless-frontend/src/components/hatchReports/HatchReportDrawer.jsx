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

  const dateChosen = form.values.observed_on.length > 0;

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
        <div className="flex column margin-bottom">
          <div className="margin-bottom">
            <Title order={5}>Hatches Observed</Title>
            <HatchlessSearch onChange={onInsectSelect} nameKey='display_name' searchType='multiSelect' />
          </div>

          <div className="margin-top margin-bottom">
            <Title order={5}>Observed On</Title>
            <div className="flex row to-center margin-top">
              <DatePicker
                styles={(theme) => ({
                  day: {
                    '&[dataSelected]': {
                      backgroundColor: 'black',
                      color: theme.white,

                      '&:hover': {
                        backgroundColor: 'var(--mantine-indigo-dark)'
                      },
                    },
                  },
                })}
                onChange={onDateChange}
                value={form.values.observed_on}
                color="indigo"
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={!dateChosen} className="full-width margin-top">Save Changes</Button>
      </form>
    </Drawer>
  );
};

export default HatchReportDrawer;