import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

import { useMe } from '../../hooks/useMe';
import { useAuth } from "../../contexts/AuthContext.jsx";

const LoginLogoutToggle = ({ themeColor = "", textColor = "black" }) => {
  const { data: user } = useMe();
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return user ? (
    <div>
      <Button variant="subtle" color={themeColor} component={Link} to={`/users/${user.id}`} size="compact-md" className="margin-right">
        <IconUserCircle />
      </Button>

      <Button variant="transparent" onClick={handleLogout} color={themeColor} size="compact-md" className="animated-link">
        <Text color={textColor} size="sm">Logout</Text>
      </Button>
    </div>
  ) : (
    <Button variant="transparent" color={themeColor} component={Link} to="/login"  size="compact-md" className="animated-link">
      <Text color={textColor} size="sm">Login</Text>
    </Button>
  );
}

export default LoginLogoutToggle;