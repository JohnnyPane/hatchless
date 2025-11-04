import { Title, Text, Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FlyShopLogo from "./FlyShopLogo.jsx";
import AddLogoDrawer from "./AddLogoDrawer.jsx";


const MyFlyShopOverview = ({ flyShop }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <div className="page">
      <div className="flex row">
        <FlyShopLogo name={flyShop.name} url={flyShop.logo_url} size={200} onClick={openDrawer} />

        <div className="margin-left">
          <Title order={2} className="">{flyShop.name}</Title>
          <Text size="lg" color="dimmed" className="">{flyShop.formatted_address}</Text>
          <Text size="lg" className="">{flyShop.description}</Text>
          <Text size="lg" className="">{flyShop.website_url}</Text>
          <Text size="lg" className="">{flyShop.email}</Text>
        </div>
      </div>

      <AddLogoDrawer flyShop={flyShop} onClose={closeDrawer} opened={drawerOpened} />
    </div>
  );
}

export default MyFlyShopOverview;