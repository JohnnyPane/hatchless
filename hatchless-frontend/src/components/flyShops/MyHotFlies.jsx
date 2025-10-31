import { useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Title, Textarea, NumberInput, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";

import { useCreateResource } from "../../hooks/useResourceMutations.js";
import useResources from "../../hooks/useResources.js";
import useResource from "../../hooks/useResource.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import HotFlyCard from "../flyPatterns/HotFlyCard.jsx";

const MyHotFlies = () => {
  const [selectedFlyId, setSelectedFlyId] = useState(null);
  const { id: flyShopId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { data: hotFlies } = useResources({ resourceName: 'hot_flies', scopes: [{ name: 'for_fly_shop', args: [flyShopId] }, { name: 'active' }] });
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

        <Button onClick={open} variant="light" className="margin-bottom">Add Hot Fly</Button>
      </div>

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

     <Drawer opened={opened} onClose={close} position="bottom" title="Select Fly Pattern" padding="md" size="md">
        <div>
          <HatchlessSearch onChange={onSelectFly} searchType='select' />

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
                  <Button type="submit" color="indigo">Add Hot Fly</Button>
                </div>
              </form>
            </div>
          }
        </div>
      </Drawer>
    </div>
  );
};

export default MyHotFlies;