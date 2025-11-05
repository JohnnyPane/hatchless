import { Text, Title } from "@mantine/core";
import useResource from "../../hooks/useResource.js";
import FlyShopLogo from "./FlyShopLogo.jsx";

const FlyShopOverview = ({ flyShopId }) => {
  const { data: flyShop } = useResource('fly_shops', flyShopId);

  return (
    <div className="margin-top">
      <div className="flex row">
        <FlyShopLogo name={flyShop.name} url={flyShop.logo_url} size={200} />

        <div className="margin-left">
          <Title order={2} className="">{flyShop.name}</Title>
          <Text size="lg" color="dimmed" className="">{flyShop.formatted_address}</Text>
          <Text size="lg" className="">{flyShop.description}</Text>
          <Text size="lg" className="">{flyShop.website_url}</Text>
          <Text size="lg" className="">{flyShop.email}</Text>
        </div>
      </div>
    </div>
  );
}

export default FlyShopOverview;