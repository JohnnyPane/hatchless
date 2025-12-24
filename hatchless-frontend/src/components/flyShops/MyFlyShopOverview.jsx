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
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column', // Mobile first
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px'
          }} className="desktop-row-override">
            <style dangerouslySetInnerHTML={{ __html: `
              @media (min-width: 768px) {
                .desktop-row-override { flex-direction: row !important; align-items: flex-start !important; }
              }
            `}} />

            <FlyShopLogo
              name={flyShop.name}
              url={flyShop.logo_url}
              size={180}
              onClick={openDrawer}
            />

            <div style={{ textAlign: 'center' }} className="desktop-text-left">
              <style dangerouslySetInnerHTML={{ __html: `
                @media (min-width: 768px) {
                  .desktop-text-left { text-align: left !important; }
                }
              `}} />
              <Title order={2}>{flyShop.name}</Title>
              <Text size="md" color="dimmed">{flyShop.formatted_address}</Text>
              <Text size="md" mt="sm">{flyShop.description}</Text>
              <Text size="md" component="a" href={flyShop.website_url} display="block" variant="link">
                {flyShop.website_url}
              </Text>
              <Text size="md">{flyShop.email}</Text>
            </div>
          </div>

          <ResourceProvider resourceName='hatch_reports' initialParams={{ perPage: 3, scopes: [{ name: 'for_fly_shop', args: [flyShop.id] }] }}>
            <HatchReports />
          </ResourceProvider>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
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