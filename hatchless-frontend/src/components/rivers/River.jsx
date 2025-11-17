import { useParams } from "react-router-dom";
import { Title, Text, Tabs } from "@mantine/core";

import useResource from "../../hooks/useResource.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import { useMe } from "../../hooks/useMe.js";

import RiverOverview from "./RiverOverview.jsx";
import HotFliesTable from "../flyPatterns/HotFliesTable.jsx";
import HatchChartPage from "./HatchChartPage.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";
import AddRiverHatchReportToggle from "../hatchReports/AddRiverHatchReportToggle.jsx";
import FlyShops from "../flyShops/FlyShops.jsx";
import FlyPacks from "../flyPacks/FlyPacks.jsx";
import './River.scss';
import HatchlessPagination from "../ui/HatchlessPagination.jsx";


const River = () => {
  const { id } = useParams();
  const { data: river, isLoading } = useResource('rivers', id);
  const { data: user } = useMe();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page margin-top">
      <div className="flex column center margin-bottom">
        <Title order={1}>{river.name}</Title>
        <Text className="secondary-text">{river.description}</Text>
      </div>

      <Tabs defaultValue="overview" keepMounted={false}>

        <Tabs.List className="margin-bottom">
          <Tabs.Tab value="overview">
            <Text size="lg" className="bold">Overview</Text>
          </Tabs.Tab>
          <Tabs.Tab value="hot_flies">
            <Text size="lg" className="bold">Hot Fly Patterns</Text>
          </Tabs.Tab>
          <Tabs.Tab value="hatch_reports">
            <Text size="lg" className="bold">Hatch Reports</Text>
          </Tabs.Tab>
          <Tabs.Tab value="hatch_charts">
            <Text size="lg" className="bold">Hatch Charts</Text>
          </Tabs.Tab>
          <Tabs.Tab value="fly_shops">
            <Text size="lg" className="bold">Fly Shops</Text>
          </Tabs.Tab>
          <Tabs.Tab value="fly_packs">
            <Text size="lg" className="bold">Fly Packs</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <RiverOverview riverId={id} />
        </Tabs.Panel>

        <Tabs.Panel value="hot_flies">
          <ResourceProvider resourceName="hot_flies" initialParams={{ scopes: [{ name: 'for_river', args: [id] }, { name: 'active' }] }}>
            <HotFliesTable />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="hatch_reports">
          <ResourceProvider resourceName="hatch_reports" initialParams={{ sortColumn: 'observed_on', sort_direction: 'desc', scopes: [{ name: 'for_river', args: [id] }] }}>
            <div className="flex to-center">
              <div className="river-hatch-reports-page flex column">
                {user && <AddRiverHatchReportToggle riverId={id}/>}
                <HatchReports />
              </div>
            </div>
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="hatch_charts">
          <ResourceProvider resourceName="hatch_windows" initialParams={{ scopes: [{ name: 'for_river', args: [id] }] }}>
            <HatchChartPage />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="fly_shops">
          <FlyShops extraParams={{ scopes: [{ name: 'for_river', args: [id] }] } }/>
        </Tabs.Panel>

        <Tabs.Panel value="fly_packs">
          <ResourceProvider resourceName="fly_packs" initialParams={{ scopes: [{ name: 'for_river', args: [id] }] }}>
            <Text className="center-text secondary-text margin-bottom">
              Fly Packs are curated sets of flies from local fly shops, matched to this river’s current conditions and hatches. Pick the right flies with confidence and spend more time fishing, less time guessing.
            </Text>

            <FlyPacks display="horizontal" />
          </ResourceProvider>
        </Tabs.Panel>

      </Tabs>
    </div>
  );
}

export default River;
