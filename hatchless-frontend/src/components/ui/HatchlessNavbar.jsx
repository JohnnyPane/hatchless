import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Box, Group, Button, Title, Text, Burger } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import HatchlessNavDrawer from './HatchlessNavDrawer.jsx';
import './HatchlessNavbar.scss';

const HatchlessNavbar = () => {
  const { data: user } = useMe();
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure(false);

  const flyShop = user?.fly_shop;

  return (
    <>
      <HatchlessNavDrawer open={burgerOpened} onClose={toggleBurger} />

      <Box>
        <header className="hatchless-navbar">
          <Group justify="space-between" h="100%" w="100%">
            <Group h="100%" gap={0}>

              <Link to="/" className="navbar-logo">
                <Title order={2} className="margin-none">Hatchless</Title>
              </Link>
            </Group>

            <Group visibleFrom="sm" className="flex row align-center">
              {flyShop && <Button size="compact-md" component={Link} to={`/fly_shops/${flyShop.id}/my_fly_shop`} variant="transparent" className="animated-link margin-right">
                <Text color="black" size="sm">{flyShop.name}</Text>
              </Button>}

              <Button size="compact-md" component={Link} to="/feed" variant="transparent" className="animated-link margin-right">
                <Text color="black" size="sm">Feed</Text>
              </Button>

              <LoginLogoutToggle />
            </Group>

            <Burger
              opened={burgerOpened}
              onClick={toggleBurger}
              color="black"
              className="burger-menu"
              hiddenFrom="sm"
            />
          </Group>
        </header>
      </Box>
    </>

  );
}

export default HatchlessNavbar;