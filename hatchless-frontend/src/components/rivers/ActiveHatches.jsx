import { useParams } from "react-router-dom";
import useResource from "../../hooks/useResource.js";
import InsectList from "../insects/InsectList.jsx";

const ActiveHatches = ({ riverId }) => {
  if (!riverId) {
    const params = useParams();
    riverId = params.id;
  }

  const { data: river, isLoading, isError, error } = useResource('rivers', riverId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Active Hatches</h2>
      <InsectList insects={river.currently_hatching_insects} />
    </div>
  );
}

export default ActiveHatches;