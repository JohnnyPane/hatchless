import { Text, Title, Grid } from "@mantine/core";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import useResource from "../../hooks/useResource.js";
import FlyShopLogo from "./FlyShopLogo.jsx";
import FlyPacks from "../flyPacks/FlyPacks.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";
import PostList from "../posts/PostList.jsx";

const FlyShopOverview = ({ flyShopId }) => {
  const { data: flyShop } = useResource('fly_shops', flyShopId);

  return (
    <div className="page">
      <Grid>
        <Grid.Col span={8}>
          <div className="flex row margin-bottom">
            <FlyShopLogo name={flyShop.name} url={flyShop.logo_url} size={200} />

            <div className="margin-left">
              <Title order={2} className="">{flyShop.name}</Title>
              <Text size="lg" color="dimmed" className="">{flyShop.formatted_address}</Text>
              <Text size="lg" className="">{flyShop.description}</Text>
              <Text size="lg" className="">{flyShop.website_url}</Text>
              <Text size="lg" className="">{flyShop.email}</Text>
            </div>
          </div>

          <ResourceProvider resourceName="hatch_reports" initialParams={{ perPage: 3, scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
            <HatchReports />
          </ResourceProvider>

          <ResourceProvider resourceName="posts" initialParams={{ perPage: 3, scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
            <div className="margin-top"></div>
            <PostList />
          </ResourceProvider>
        </Grid.Col>

        <Grid.Col span={4}>
          <ResourceProvider resourceName="fly_packs" initialParams={{ scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
            <Title order={3} className="margin-4-b center-text">Fly Packs</Title>
            <FlyPacks />
          </ResourceProvider>
        </Grid.Col>
      </Grid>

    </div>
  );
}

export default FlyShopOverview;