import { useParams } from "react-router-dom";
import { Grid, Title, Text } from "@mantine/core";

import useResource from "../../hooks/useResource.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import ActiveHatches from "./ActiveHatches.jsx";
import HatchChartPage from "./HatchChartPage.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";

const River = () => {
  const { id } = useParams();
  const { data: river, isLoading } = useResource('rivers', id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page">
      <Title order={1}>{river.name}</Title>
      <Text>Description: {river.description}</Text>

      <Grid>
        <Grid.Col span={8} p={20}>
          <HatchChartPage initialScope={{ name: 'currently_hatching' }} />

          <ResourceProvider resourceName="hatch_reports" initialParams={{ scopes: [{ name: 'for_river', args: [id] }], perPage: 3 }}>
            <HatchReports />
          </ResourceProvider>
        </Grid.Col>
        <Grid.Col span={4} p={20}>
          <ActiveHatches riverId={id} />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default River;
