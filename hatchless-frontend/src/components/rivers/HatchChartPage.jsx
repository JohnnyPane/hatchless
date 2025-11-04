import { useParams } from "react-router-dom";
import { Title } from "@mantine/core";

import { ResourceProvider, useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchlessScopes from "../ui/HatchlessScopes.jsx";
import HatchChart from "./HatchChart.jsx";

const hatchWindowScopes = [{
  type: 'buttons',
  options: [
    { label: 'Show Active Hatches', value: 'currently_hatching', activeLabel: 'Show All Hatches' },
  ]
}];


const ChartPage = () => {
  const { data: hatchWindows, isLoading, scopes } = useResourceContext();

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize).reverse());
    }
    return chunks;
  };

  const hatchWindowChunks = chunkArray(hatchWindows, 10);
  const currentlyHatchingScope = scopes.find(scope => scope.name === 'currently_hatching');

  return (
    <div className="flex column">
      <div className="flex row align-center margin-4-b">
        <Title order={4} className="margin-right">Hatch Chart</Title>
        <HatchlessScopes scopeConfigs={hatchWindowScopes} />
      </div>

      {hatchWindowChunks.length === 0 && currentlyHatchingScope && (
        <div className="flex row to-center margin-80-t margin-80-b">
          No currently active hatches - click "Show All Hatches" to get a full view of the hatch chart.
        </div>
      )}

      {hatchWindowChunks.length === 0 && !currentlyHatchingScope && (
        <div className="flex row to-center margin-80-t margin-80-b">
          No hatch chart for this stretch (yet).
          [Shoot us a message] and we’ll work on adding it!
        </div>
      )}

      {hatchWindowChunks.map((chunk, idx) => (
        <div key={idx} className="flex justify-center">
          <HatchChart hatchWindows={chunk} />
        </div>
      ))}
    </div>
  );
};

const HatchChartPage = ({ initialScope }) => {
  const { id: riverId } = useParams();

  const riverScope = { name: "by_river", args: [riverId] };
  const initialScopes = initialScope ? [riverScope, initialScope ] : [riverScope];

  return (
    <ResourceProvider
      resourceName="hatch_windows"
      initialParams={{
        perPage: 100,
        scopes: initialScopes,
        sortColumn: "common_name",
        sortDirection: "desc",
      }}
    >
      <ChartPage />
    </ResourceProvider>
  );
}

export default HatchChartPage;