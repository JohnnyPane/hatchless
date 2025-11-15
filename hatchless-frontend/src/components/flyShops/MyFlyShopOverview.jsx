import { Title, Text, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import FlyShopLogo from "./FlyShopLogo.jsx";
import AddLogoDrawer from "./AddLogoDrawer.jsx";
import FlyPacks from "../flyPacks/FlyPacks.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";


const MyFlyShopOverview = ({ flyShop }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <div className="page">
      <Grid>
        <Grid.Col span={8}>
          <div className="flex row margin-bottom">
            <FlyShopLogo name={flyShop.name} url={flyShop.logo_url} size={200} onClick={openDrawer} />

            <div className="margin-left">
              <Title order={2} className="">{flyShop.name}</Title>
              <Text size="lg" color="dimmed" className="">{flyShop.formatted_address}</Text>
              <Text size="lg" className="">{flyShop.description}</Text>
              <Text size="lg" className="">{flyShop.website_url}</Text>
              <Text size="lg" className="">{flyShop.email}</Text>
            </div>
          </div>

          <ResourceProvider resourceName='hatch_reports' initialParams={{ perPage: 3, scopes: [{ name: 'for_fly_shop', args: [flyShop.id] }] }}>
            <HatchReports />
          </ResourceProvider>
        </Grid.Col>

        <Grid.Col span={4}>
          <ResourceProvider resourceName="fly_packs" initialParams={{ scopes: [{ name: 'for_fly_shop', args: [flyShop.id] }] }}>
            <FlyPacks />
          </ResourceProvider>
        </Grid.Col>
      </Grid>

      <AddLogoDrawer flyShop={flyShop} onClose={closeDrawer} opened={drawerOpened} />
    </div>
  );
}

export default MyFlyShopOverview;