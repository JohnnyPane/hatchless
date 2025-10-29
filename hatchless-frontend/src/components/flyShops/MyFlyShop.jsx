import { useParams } from "react-router-dom";
import { Text, Title, Tabs } from "@mantine/core";

import { useMe } from "../../hooks/useMe.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import useResource from "../../hooks/useResource.js";
import MyHotFlies from "./MyHotFlies.jsx";
import MyHatchReports from "./MyHatchReports.jsx";
import './MyFlyShop.scss'
import MyShopRivers from "./MyShopRivers.jsx";

const MyFlyShop = () => {
  const { id } = useParams();

  const { data: user } = useMe();
  const { data: flyShop, isLoading } = useResource('fly_shops', id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user?.fly_shop?.id !== flyShop.id) {
    return <div>You do not have permission to view this fly shop.</div>;
  }

  return (
    <div className="page">

      <Title order={2} className="center-text margin">{flyShop.name}</Title>

      <Tabs defaultValue="overview" color="indigo" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="overview">
            <Text size="lg" className="bold">Overview</Text>
          </Tabs.Tab>
          <Tabs.Tab value="hot_flies">
            <Text size="lg" className="bold">Hot Flies</Text>
          </Tabs.Tab>
          <Tabs.Tab value="hatch_reports">
            <Text size="lg" className="bold">Hatch Reports</Text>
          </Tabs.Tab>
          <Tabs.Tab value="rivers">
            <Text size="lg" className="bold">Rivers</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="xs">
          <div>
            <h2>Fly Shop Overview</h2>
            <p>Manage your fly shop details and settings here.</p>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="hot_flies" pt="xs">
          <ResourceProvider resourceName="fly_patterns" initialParams={{ searchColumn: "name" }}>
            <MyHotFlies />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="hatch_reports" pt="xs">
          <ResourceProvider resourceName="hatch_reports" initialParams={{ scopes: [{ name: 'by_fly_shop', args: [flyShop.id] }] }}>
            <MyHatchReports />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="rivers" pt="xs">
          <ResourceProvider resourceName="shop_rivers" initialParams={{ scopes: [{ name: 'for_fly_shop', args: [flyShop.id]}] }}>
            <MyShopRivers flyShopId={id} />
          </ResourceProvider>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default MyFlyShop;