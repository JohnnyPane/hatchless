import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';

import { useMe } from '../../hooks/useMe';
import { useAuth } from "../../contexts/AuthContext.jsx";

const LoginLogoutToggle = ({ className = "" }) => {
  const { data: user } = useMe();
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return user ? (
    <Button variant="transparent" onClick={handleLogout} color="indigo" size="compact-md" className="animated-link">
      <Text color="black" size="xs">Logout</Text>
    </Button>
  ) : (
    <Button variant="transparent" color="indigo" component={Link} to="/login"  size="compact-md" className="animated-link">
      <Text color="black" size="xs">Login</Text>
    </Button>
  );
}

export default LoginLogoutToggle;