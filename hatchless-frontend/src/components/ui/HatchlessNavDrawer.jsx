import { useNavigate } from "react-router-dom";
import { Drawer, Button, Divider } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";
import { useMe } from "../../hooks/useMe.js";

const NavButton = ({ label, onClick }) => {
  return (
    <Button
      size="compact-md"
      variant="transparent"
      color="black"
      className="animated-link margin-bottom full-width"
      onClick={onClick}
      justify="space-between"
      rightSection={<IconChevronRight size={20} />}
    >
      {label}
    </Button>
  );
}

const HatchlessNavDrawer = ({ open, onClose }) => {
  const { data: user } = useMe();
  const flyShop = user?.fly_shop;

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  }

  return (
    <Drawer
      opened={open}
      onClose={onClose}
      size="sm"
      position="right"
    >
      <div className="flex column space-between margin-top">
        <div className="flex column align-start">
          {flyShop && (
            <NavButton onClick={() => handleNavigation(`/fly_shops/${flyShop.id}/my_fly_shop`)} label={flyShop.name} />
          )}

          <NavButton onClick={() => handleNavigation('/feed')} label="My Feed" />
          <NavButton onClick={() => handleNavigation('/fly_shops')} label="Fly Shops" />
          <NavButton onClick={() => handleNavigation('/rivers')} label="Rivers" />
          <NavButton onClick={() => handleNavigation('/')} label="Home" />
          {user && (
            <NavButton onClick={() => handleNavigation(`/users/${user.id}`)} label="My Profile" />
          )}

        </div>


        <div className="margin-80-t">
          <Divider my="lg" />

          <div className="flex to-center">
            <LoginLogoutToggle />

          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default HatchlessNavDrawer;