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
  const { data: hatchWindows, isLoading } = useResourceContext();

  // if (isLoading) return <div>Loading hatch data...</div>;
  // if (!hatchWindows || hatchWindows.length === 0) return <div>No hatch data available.</div>;

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize).reverse());
    }
    return chunks;
  };

  const hatchWindowChunks = chunkArray(hatchWindows, 10);

  return (
    <div className="flex column">
      <div className="flex row align-center margin-4-b">
        <Title order={4} className="margin-right">Hatch Chart</Title>
        <HatchlessScopes scopeConfigs={hatchWindowScopes} />
      </div>

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

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const riverScope = { name: "by_river", args: [riverId] };
  const initialScopes = initialScope ? [riverScope, initialScope ] : [riverScope];

  return (
    <ResourceProvider
      resourceName="hatch_windows"
      initialParams={{
        perPage: 100,
        scopes: initialScopes,
        sortColumn: "start_day_of_year",
        sortDirection: "asc",
      }}
    >
      <ChartPage />
    </ResourceProvider>
  );
}

export default HatchChartPage;