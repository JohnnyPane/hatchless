import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HotFlyCard from "./HotFlyCard.jsx";

const HotFlies = () => {
  const { data: hotFlies, isLoading } = useResourceContext();

  if (isLoading) {
    return <div>Loading hot flies...</div>;
  }

  return (
    <div className="flex column align-center">
      {hotFlies.map((hotFly) => (
        <HotFlyCard hotFly={hotFly} editable={true} key={hotFly.id} />
      ))}
    </div>
  );
}

export default HotFlies;