import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Text, Title, Textarea, NumberInput, Button, Drawer, Fieldset, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";

import { useCreateResource } from "../../hooks/useResourceMutations.js";
import { ResourceProvider, useResourceContext } from "../../contexts/ResourceContext.jsx";
import useResource from "../../hooks/useResource.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";
import HotFlyCard from "../flyPatterns/HotFlyCard.jsx";

const MyHotFlies = () => {
  const [selectedFlyId, setSelectedFlyId] = useState(null);
  const { id: flyShopId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { data: hotFlies, total } = useResourceContext();
  const { data: selectedFly } = useResource("fly_patterns", selectedFlyId);
  const { data: flyShop } = useResource("fly_shops", flyShopId);
  const createHotFly = useCreateResource('hot_flies');

  const form = useForm({
    initialValues: {
      fly_pattern_id: '',
      fly_shop_id: flyShopId,
      notes: '',
      min_size: null,
      max_size: null
    },
  });

  const onSelectFly = (flyId) => {
    setSelectedFlyId(flyId);
  }

  const addHotFly = async () => {
    const payload = {
      fly_pattern_id: selectedFlyId,
      fly_shop_id: flyShopId,
      notes: form.values.notes,
      min_size: form.values.min_size,
      max_size: form.values.max_size
    }

    try {
      await createHotFly.mutateAsync(payload);
      form.reset();
      setSelectedFlyId(null);
      close();
    } catch (error) {
      console.error("Failed to add hot fly:", error);
    }
  }

  return (
    <div className="page">
      <div className="flex row space-between align-start">
        <div>
          <Title order={2}>{flyShop.name} Hot Flies</Title>
          <Text className="secondary-text">Share what’s working! Add the flies you’d recommend to anglers this week based on what’s been producing on your local waters.</Text>
        </div>

        <Button onClick={open} variant="filled" className="margin-bottom">Add Hot Fly</Button>
      </div>

      <Text size="xs" color="dimmed">Total: {total}</Text>
      <div className="flex row wrap to-center">
        {hotFlies && hotFlies.length > 0 ? (
          <>
            {hotFlies.map((hotFly) => (
              <HotFlyCard hotFly={hotFly} editable={true} key={hotFly.id} />
            ))}
          </>
        ) : (
          <Text className="margin-80-t">No hot flies added yet.</Text>
        )}

      </div>

      <div className="flex center">
        <HatchlessPagination />
      </div>

     <Drawer opened={opened} onClose={close} position="bottom" padding="md" size="md">
        <Grid>
          <Grid.Col span={8}>
            <Fieldset legend={<Text size="lg" className="bold">Add a Hot Fly Pattern to Your Shop's Recommendations</Text>}>
              <ResourceProvider resourceName="fly_patterns" initialParams={{ searchColumn: "name" }}>
                <HatchlessSearch onChange={onSelectFly} searchType='select' />
              </ResourceProvider>

              { selectedFly &&
                <div>
                  <h3>{selectedFly.name}</h3>
                  <p>{selectedFly.notes}</p>

                  <form onSubmit={form.onSubmit(addHotFly)}>
                    <Textarea
                      label="Notes"
                      placeholder="Add any notes about this hot fly..."
                      {...form.getInputProps('notes')}
                      className="margin-bottom"
                    />

                    <div className="flex row">
                      <NumberInput
                        label="From Size"
                        placeholder="Enter minimum size"
                        {...form.getInputProps('min_size')}
                        className="margin-right"
                      />

                      <NumberInput
                        label="To Size"
                        placeholder="Enter maximum size"
                        {...form.getInputProps('max_size')}
                        className="margin-bottom"
                      />
                    </div>

                    <div>
                      <Button type="submit">Add Hot Fly</Button>
                    </div>
                  </form>
                </div>
              }
            </Fieldset>
          </Grid.Col>

          <Grid.Col span={4}>
            <Fieldset legend={<Text size="lg" className="bold">Not seeing your fly pattern?</Text>}>
              <Text>Make sure it’s been added to your shop’s inventory first, then come back here to highlight it as a hot fly!</Text>
              <Button component={Link} to={`/fly_shops/${flyShopId}/my_fly_shop/add_fly_pattern`} variant="light" className="margin-top">Add Fly Pattern</Button>
            </Fieldset>
          </Grid.Col>
        </Grid>
      </Drawer>
    </div>
  );
};

export default MyHotFlies;