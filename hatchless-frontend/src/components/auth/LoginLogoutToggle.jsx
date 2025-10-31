import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';

import { useMe } from '../../hooks/useMe';
import { useAuth } from "../../contexts/AuthContext.jsx";

const LoginLogoutToggle = ({ themeColor = "indigo", textColor = "black" }) => {
  const { data: user } = useMe();
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return user ? (
    <Button variant="transparent" onClick={handleLogout} color={themeColor} size="compact-md" className="animated-link">
      <Text color={textColor} size="sm">Logout</Text>
    </Button>
  ) : (
    <Button variant="transparent" color={themeColor} component={Link} to="/login"  size="compact-md" className="animated-link">
      <Text color={textColor} size="sm">Login</Text>
    </Button>
  );
}

export default LoginLogoutToggle;