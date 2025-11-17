import { useResourceContext } from '../../contexts/ResourceContext';
import { Text } from '@mantine/core';
import FlyPackCard from "./FlyPackCard.jsx";
import HatchlessPagination from "../ui/HatchlessPagination.jsx";

const FlyPacks = ({ display = "vertical", editable = false }) => {
  const { data: flyPacks, isLoading, total } = useResourceContext();

  const flexDirection = display === "horizontal" ? "row wrap space-around" : "column align-center";
  const showPagination = display === "horizontal";

  if (isLoading) {
    return <div>Loading fly packs...</div>;
  }

  return (
    <>
      <Text color="dimmed" size="sm">
        Total: {total}
      </Text>
      <div className={`flex ${flexDirection}`}>
        {flyPacks.map((flyPack) => (
          <FlyPackCard key={flyPack.id} flyPackAttributes={flyPack} editable={editable} />
        ))}

        {flyPacks.length === 0 && (
          <div className="center-text secondary-text margin-top">
            No fly packs found.
          </div>
        )}
      </div>

      {showPagination && <div className="flex center margin-bottom">
        <HatchlessPagination/>
      </div>}
    </>

  );
}

export default FlyPacks;