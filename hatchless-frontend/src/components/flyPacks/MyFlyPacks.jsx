import { Drawer, Button, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import FlyPackForm from "./FlyPackForm.jsx";
import FlyPackCard from "./FlyPackCard.jsx";

const MyFlyPacks = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: flyPacks } = useResourceContext();

  return (
    <div className="page">
      <div className="flex row space-between align-start">
        <Title order={2}>My Fly Packs</Title>
        <Button className="button primary" onClick={open}>Create New Fly Pack</Button>
      </div>

      <Text className="secondary-text center-text padding">
        Fly Packs help your shop increase sales by offering anglers pre-selected bundles of flies that match the season, species, or local conditions.
        They reduce decision fatigue, build trust in your expertise, and make it effortless for customers to buy with confidence.
        Create more Fly Packs to get your recommendations in front of more anglers and sell more flies with less effort.
      </Text>

      <div>
        {flyPacks && flyPacks.length > 0 ? (
          <div className="flex row wrap margin-top space-around">
            {flyPacks.map((pack) => (
              <FlyPackCard key={pack.id} flyPackAttributes={pack} />
            ))}
          </div>
        ) : (
          <Text className="margin-top">You have no fly packs. Click "Create New Fly Pack" to get started.</Text>
        )}
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        title={<Text size="lg" className="bold">Create New Fly Pack</Text>}
        padding="xl"
        position="right"
        size="lg"
      >
        <FlyPackForm onSuccess={close} />
      </Drawer>
    </div>
  );
}

export default MyFlyPacks;