import { useState } from "react";
import { useParams } from "react-router-dom";
import { Textarea, Button, Card, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from "@mantine/form";

import { useCreateResource, useUpdateResource } from "../../hooks/useResourceMutations.js";
import useResources from "../../hooks/useResources.js";
import useResource from "../../hooks/useResource.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";

const MyHotFlies = () => {
  const [selectedFlyId, setSelectedFlyId] = useState(null);
  const { id: flyShopId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { data: hotFlies } = useResources({ resourceName: 'hot_flies', scopes: [{ name: 'by_fly_shop', args: [flyShopId] }, { name: 'active' }] });
  const { data: selectedFly } = useResource("fly_patterns", selectedFlyId);
  const createHotFly = useCreateResource('hot_flies');
  const updateHotFly = useUpdateResource('hot_flies');

  const form = useForm({
    initialValues: {
      fly_pattern_id: '',
      fly_shop_id: flyShopId,
      notes: '',
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

  const deactivateHotFly = async (hotFlyId) => {
    try {
      await updateHotFly.mutateAsync({ id: hotFlyId, active: false });
    } catch (error) {
      console.error("Failed to deactivate hot fly:", error);
    }
  }

  return (
    <div>
      <h2>My Hot Flies</h2>
      <Button onClick={open} color="teal" className="margin-bottom">Add Hot Fly</Button>

      {hotFlies && hotFlies.length > 0 ? (
        <>
          {hotFlies.map((hotFly) => (
            <Card key={hotFly.id} shadow="sm" padding="lg" radius="md" withBorder className="margin-bottom">
              <strong>{hotFly.attributes.fly_pattern.name}</strong> {hotFly.attributes.notes}
              <Button variant="subtle" color="gray" onClick={() => deactivateHotFly(hotFly.id)} size="xs">
                Remove
              </Button>
            </Card>
          ))}
        </>
      ) : (
        <p>No hot flies added yet.</p>
      )}

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
                <div className="flex to-right">
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