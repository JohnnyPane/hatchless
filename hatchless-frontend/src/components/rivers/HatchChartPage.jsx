import { useParams } from "react-router-dom";
import { ResourceProvider, useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchlessScopes from "../ui/HatchlessScopes.jsx";
import HatchChart from "./HatchChart.jsx";

const hatchWindowScopes = [{
  type: 'buttons',
  options: [
    { label: 'Active Hatches', value: 'currently_hatching', activeLabel: 'All Hatches' },
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
      <div className="flex to-right">
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

const HatchChartPage = () => {
  const { id: riverId } = useParams();

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <ResourceProvider
      resourceName="hatch_windows"
      initialParams={{
        perPage: 1000,
        scopes: [{ name: "by_river", args: [riverId] }],
        sortColumn: "start_day_of_year",
        sortDirection: "asc",
      }}
    >
      <ChartPage />
    </ResourceProvider>
  );
}

export default HatchChartPage;