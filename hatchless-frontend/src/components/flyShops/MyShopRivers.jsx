import { Title, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ResourceProvider, useResourceContext } from "../../contexts/ResourceContext.jsx";
import useResources from "../../hooks/useResources.js";
import { useDeleteResource } from "../../hooks/useResourceMutations.js";
import HatchlessTablePage from "../ui/HatchlessTablePage.jsx";
import AddShopRiverDrawer from "./AddShopRiverDrawer.jsx";

const riversTableData = [
  { label: 'River', accessor: 'river.name', type: 'text' },
  { label: 'Water Type', accessor: 'river.water_type', type: 'text' },
  { label: 'Classification', accessor: 'river.designation', type: 'text' },
  { label: 'Classification System', accessor: 'river.designation_system', type: 'text' },
];


const MyShopRivers = ({ flyShopId }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: shopRivers } = useResourceContext();
  const deleteShopRiverMutation = useDeleteResource('shop_rivers');

  const handleRemoveRiver = async (shopRiverId) => {
    await deleteShopRiverMutation.mutateAsync(shopRiverId);
  }

  const RemoveShopRiverButton = ({ actionItem }) => {
    const shopRiverId = actionItem.id;

    return (
      <Button
        size="compact-xs"
        color="red"
        variant="subtle"
        onClick={() => handleRemoveRiver(shopRiverId)}
      >
        Remove River
      </Button>
    );
  }

  return (
    <div className="page">
      <div className="margin-bottom">
        <div className="flex row space-between margin-4-b">
          <Title order={2}>Your Shop's Rivers</Title>
          <Button className="margin-left" size="sm" onClick={openDrawer}>Add River to Fly Shop</Button>
        </div>
        <Text className="secondary-text" size="sm">
          Choose the rivers your shop serves to help local anglers find you and stay connected to the waters you know best.

          When your shop is linked to a river, anglers browsing that river’s page will see your shop listed as a trusted resource for gear, advice, and hatch updates.

          Associating rivers also lets you publish hatch reports directly to those waters—helping anglers choose the right flies and making your shop part of their next great day on the water.
        </Text>
      </div>

      <div>
        <Title order={4} className="margin-4-b">Rivers Associated with Your Fly Shop</Title>
        <HatchlessTablePage columns={riversTableData} actionComponent={RemoveShopRiverButton} resourceName="shop_rivers" />
      </div>

      <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", scopes: [{ name: 'not_for_fly_shop', args: [flyShopId]}] }}>
        <AddShopRiverDrawer shopRivers={shopRivers} opened={drawerOpened} onClose={closeDrawer} flyShopId={flyShopId} />
      </ResourceProvider>
    </div>
  );
}

export default MyShopRivers;