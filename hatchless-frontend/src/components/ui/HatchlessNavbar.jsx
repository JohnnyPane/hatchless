import { Link } from 'react-router-dom';
import { Box, Group, Button, Title, Text } from '@mantine/core';

import { useMe } from '../../hooks/useMe.js';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import './HatchlessNavbar.scss';

const HatchlessNavbar = () => {
  const { data: user } = useMe();
  const flyShop = user?.fly_shop;

  return (
    <Box>
      <header className="hatchless-navbar">
        <Group justify="space-between" h="100%" w="100%" px={20}>
          <Group h="100%" gap={0} visibleFrom="sm">

            <Link to="/" className="navbar-logo">
              <Title order={2} className="margin-none">Hatchless</Title>
            </Link>
          </Group>

          <Group h="100%" gap={40}>
            {flyShop && <Button size="compact-md" component={Link} to={`/fly_shops/${flyShop.id}/my_fly_shop`} variant="transparent" className="animated-link" color="indigo">
              <Text color="black" size="sm">{flyShop.name}</Text>
            </Button>}

            <Button size="compact-md" component={Link} to="/rivers" variant="transparent" className="animated-link" color="indigo">
              <Text color="black" size="sm">Rivers</Text>
            </Button>
          </Group>

          <LoginLogoutToggle />
        </Group>
      </header>
    </Box>
  );
}

export default HatchlessNavbar;