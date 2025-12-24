import { Grid } from "@mantine/core";
import HatchChartPage from "./HatchChartPage.jsx";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";
import ActiveHatches from "./ActiveHatches.jsx";

const RiverOverview = ({ riverId }) => {
  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, md: 8 }} p={{ base: 10, md: 20 }}>
        <HatchChartPage initialScope={{ name: 'currently_hatching' }} />

        <ResourceProvider
          resourceName="hatch_reports"
          initialParams={{
            sortColumn: 'observed_on',
            scopes: [{ name: 'for_river', args: [riverId] }],
            perPage: 3
          }}
        >
          <HatchReports />
        </ResourceProvider>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }} p={{ base: 10, md: 20 }}>
        <ActiveHatches riverId={riverId} />
      </Grid.Col>
    </Grid>
  );
}

export default RiverOverview;