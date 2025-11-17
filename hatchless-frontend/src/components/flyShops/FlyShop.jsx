import { useParams } from "react-router-dom";
import { Tabs, Text, Title } from "@mantine/core";

import useResource from "../../hooks/useResource.js";
import { useMe } from "../../hooks/useMe.js";
import {ResourceProvider} from "../../contexts/ResourceContext.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";
import HotFliesTable from "../flyPatterns/HotFliesTable.jsx";
import FlyShopOverview from "./FlyShopOverview.jsx";
import FlyPacks from "../flyPacks/FlyPacks.jsx";
import './FlyShop.scss'

const FlyShop = () => {
  const { id } = useParams();
  const { data: flyShop, isLoading, isError, error } = useResource('fly_shops', id);
  const { data: user } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="page">

      <Title order={2} className="center-text">{flyShop.name}</Title>
      {flyShop.formatted_address && <Text className="secondary-text center-text ">
        {flyShop.formatted_address}
      </Text>}

      <Tabs defaultValue="overview" keepMounted={false}>
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
          <Tabs.Tab value="fly_packs">
            <Text size="lg" className="bold">Fly Packs</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <FlyShopOverview flyShopId={id} />
        </Tabs.Panel>

        <Tabs.Panel value="hot_flies">
          <ResourceProvider resourceName="hot_flies" initialParams={{ scopes: [{ name: "for_fly_shop", args: [id]}] }}>
            <div className="margin-top">
              <HotFliesTable  displayHeader={false} />
            </div>
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="hatch_reports">
          <ResourceProvider resourceName="hatch_reports" initialParams={{ sortColumn: 'observed_on', sortDirection: 'desc', scopes: [{ name: "for_fly_shop", args: [id]}] }}>
            <div className="flex to-center">
              <div className="fly-shop-hatch-reports-page margin-top">
                <HatchReports />
              </div>
            </div>
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="fly_packs">
          <ResourceProvider resourceName="fly_packs" initialParams={{ scopes: [{ name: "for_fly_shop", args: [id]}] }}>
            <div className="margin-top">
              {/*<Title order={3} className="center-text">Fly Packs</Title>*/}
              <Text size="lg" className="secondary-text center-text margin-bottom">
                Fly Packs connect you with the knowledge of local fly shops and guides.
                Every pack reflects real conditions, real hatches, and real experience from the people who fish those waters every day.
                Support local shops and fish more confidently.
              </Text>

              <FlyPacks display="horizontal" />
            </div>
          </ResourceProvider>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default FlyShop;