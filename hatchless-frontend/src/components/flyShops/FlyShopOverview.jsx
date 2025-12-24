import { Grid, Title, Text, Stack, Group, Box } from '@mantine/core';
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import useResource from "../../hooks/useResource.js";
import FlyShopLogo from "./FlyShopLogo.jsx";
import FlyPacks from "../flyPacks/FlyPacks.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";
import PostList from "../posts/PostList.jsx";

const FlyShopOverview = ({ flyShopId }) => {
  const { data: flyShop } = useResource('fly_shops', flyShopId);

  if (!flyShop) return null;

  return (
    <Box className="page">
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Group
            className="wrap"
            align={{ base: 'center', sm: 'flex-start' }}
            justify={{ base: 'center', sm: 'flex-start' }}
          >
            <FlyShopLogo
              name={flyShop.name}
              url={flyShop.logo_url}
              size={180}
            />

            <div>
              <Title order={1}>
                {flyShop.name}
              </Title>
              <Text size="md" c="dimmed">
                {flyShop.formatted_address}
              </Text>
              <Text size="md">
                {flyShop.description}
              </Text>

              <Group className="margin-4-t">
                <Text size="sm" component="a" target="_blank" rel="noopener noreferrer" href={flyShop.website_url.startsWith('http') ? flyShop.website_url : `https://${flyShop.website_url}`} c="blue">Website</Text>
                <Text size="sm" c="dimmed">•</Text>
                <Text size="sm" component="a" href={`mailto:${flyShop.email}`} c="blue">Email</Text>
              </Group>
            </div>
          </Group>

          <Stack mt="xs">
            <ResourceProvider resourceName="hatch_reports" initialParams={{ perPage: 3, scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
              <Title order={3}>Latest Hatch Reports</Title>
              <HatchReports />
            </ResourceProvider>

            <ResourceProvider resourceName="posts" initialParams={{ perPage: 3, scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
              <Title order={3}>Recent Posts</Title>
              <PostList />
            </ResourceProvider>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ResourceProvider resourceName="fly_packs" initialParams={{ scopes: [{ name: "for_fly_shop", args: [flyShopId]}] }}>
            <Title order={3} mb="md" ta="center">Fly Packs</Title>
            <FlyPacks />
          </ResourceProvider>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default FlyShopOverview;