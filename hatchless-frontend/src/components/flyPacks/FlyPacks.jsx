import { useResourceContext } from '../../contexts/ResourceContext';
import FlyPackCard from "./FlyPackCard.jsx";

const FlyPacks = ({ flexDirection = "column align-center" }) => {
  const { data: flyPacks, isLoading } = useResourceContext();

  if (isLoading) {
    return <div>Loading fly packs...</div>;
  }

  return (
    <div className={`flex ${flexDirection}`}>
      {flyPacks.map((flyPack) => (
        <FlyPackCard key={flyPack.id} flyPackAttributes={flyPack} />
      ))}

      {flyPacks.length === 0 && (
        <div className="center-text secondary-text margin-top">
          No fly packs found.
        </div>
      )}
    </div>
  );
}

export default FlyPacks;