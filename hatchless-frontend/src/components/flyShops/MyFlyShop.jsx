import { useParams } from "react-router-dom";
import { Title, Tabs } from "@mantine/core";

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
    <div>
      <Title order={2}>{flyShop.name}</Title>

      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="hot_flies">
            Hot Flies
          </Tabs.Tab>
          <Tabs.Tab value="hatch_reports">
            Hatch Reports
          </Tabs.Tab>
          <Tabs.Tab value="rivers">
            Rivers
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
          <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", scopes: [{ name: 'not_by_fly_shop', args: [flyShop.id]}] }}>
            <MyShopRivers flyShopId={id} />
          </ResourceProvider>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default MyFlyShop;