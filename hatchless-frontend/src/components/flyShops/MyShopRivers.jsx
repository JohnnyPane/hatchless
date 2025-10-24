import { Text, Button } from "@mantine/core";
import useResources from "../../hooks/useResources.js";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { useCreateResource, useDeleteResource } from "../../hooks/useResourceMutations.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";


const MyShopRivers = ({ flyShopId }) => {
  const { data: shopRivers, isLoading, refetch } = useResources({ resourceName: 'shop_rivers', scopes: [{ name: 'by_fly_shop', args: [flyShopId]}] });
  const { data: allRivers } = useResourceContext();
  const createShopRiverMutation = useCreateResource('shop_rivers');
  const deleteShopRiverMutation = useDeleteResource('shop_rivers');

  const handleAddRiver = async (riverId) => {
    await createShopRiverMutation.mutateAsync({ fly_shop_id: flyShopId, river_id: riverId });
  }

  const handleRemoveRiver = async (shopRiverId) => {
    await deleteShopRiverMutation.mutateAsync(shopRiverId);
  }

  return (
    <div>
      <h2>Rivers Associated with Your Fly Shop</h2>
      {shopRivers && shopRivers.length > 0 ? (
        <div>
          {shopRivers.map((shopRiver) => (
            <div>
              <Text key={shopRiver.id}>{shopRiver.attributes.river.name}</Text>
              <Button
                size="xs"
                onClick={() => handleRemoveRiver(shopRiver.id)}
              >
                Remove from Fly Shop
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No rivers associated with this fly shop yet.</p>
      )}

      <HatchlessSearch
        resourceName="rivers"
        onChange={handleAddRiver}
        placeholder="Search and add rivers to your fly shop..."
      />

      {allRivers && allRivers.length > 0 ? (
        <div className="margin-top-small">
          <h3>All Available Rivers</h3>
            {allRivers.map((river) => (
              <div>
                <Text key={river.id}>{river.attributes.name}</Text>
                <Button
                  size="xs"
                  onClick={() => handleAddRiver(river.id)}
                  disabled={shopRivers.some((shopRiver) => shopRiver.attributes.river.id === river.id)}
                >
                  {shopRivers.some((shopRiver) => shopRiver.attributes.river.id === river.id) ? 'Added' : 'Add to Fly Shop'}
                </Button>
              </div>
            ))}
        </div>
      ) : (
        <p>No rivers match your search parameters.</p>
      )}
    </div>
  );
}

export default MyShopRivers;