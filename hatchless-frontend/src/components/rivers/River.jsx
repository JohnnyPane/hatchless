import { useParams } from "react-router-dom";
import useResource from "../../hooks/useResource.js";
import ActiveHatches from "./ActiveHatches.jsx";
import HatchChart from "./HatchChart.jsx";
import HatchChartPage from "./HatchChartPage.jsx";

const River = () => {
  const { id } = useParams();
  const { data: river, isLoading, isError, error } = useResource('rivers', id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{river.name}</h1>
      <p>Description: {river.description}</p>
      <ActiveHatches />
      <HatchChartPage />
    </div>
  );
}

export default River;
