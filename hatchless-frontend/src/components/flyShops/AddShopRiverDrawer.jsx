import { Drawer, Card, Button, Text } from '@mantine/core';
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import {useCreateResource} from "../../hooks/useResourceMutations.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";

const AddShopRiverDrawer = ({ opened, onClose, shopRivers, flyShopId }) => {
  const { data: allRivers } = useResourceContext();
  const createShopRiverMutation = useCreateResource('shop_rivers');

  const handleAddRiver = async (riverId) => {
    await createShopRiverMutation.mutateAsync({ fly_shop_id: flyShopId, river_id: riverId });
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Add Shop River"
      padding="md"
      size="md"
      position="right"
    >
      <HatchlessSearch
        resourceName="rivers"
        onChange={handleAddRiver}
        placeholder="Search and add rivers to your fly shop..."
      />

      {allRivers && allRivers.length > 0 ? (
        <div className="margin-top-small">
          <h3>All Available Rivers</h3>
            {allRivers.map((river) => (
              <Card shadow="sm" withBorder padding="sm" className="margin-4-t margin-4-b" key={river.id}>
                <div className="flex row align-center space-between" key={river.id}>
                  <Text key={river.id}>{river.attributes.name}</Text>
                  <Button
                    size="compact-xs"
                    color="indigo"
                    variant="light"
                    onClick={() => handleAddRiver(river.id)}
                    disabled={shopRivers.some((shopRiver) => shopRiver.attributes.river.id === river.id)}
                  >
                    {shopRivers.some((shopRiver) => shopRiver.attributes.river.id === river.id) ? 'Added' : 'Add to Fly Shop'}
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <div className="flex row to-center margin-80-t">
          <Text>No rivers match your search parameters.</Text>
        </div>
      )}
    </Drawer>
  );
}

export default AddShopRiverDrawer;