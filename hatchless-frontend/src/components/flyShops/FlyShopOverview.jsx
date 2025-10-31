import { Text } from "@mantine/core";
import useResource from "../../hooks/useResource.js";

const FlyShopOverview = ({ flyShopId }) => {
  const { data: flyShop, isLoading, isError, error } = useResource('fly_shops', flyShopId);

  return (
    <div className="center-text margin-top">
      {flyShop.description}
    </div>
  );
}

export default FlyShopOverview;