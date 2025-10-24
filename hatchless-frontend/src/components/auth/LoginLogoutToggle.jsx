import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

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
    <Button variant="subtle" onClick={handleLogout} color="gray" className={className}>
      Logout
    </Button>
  ) : (
    <Button variant="subtle" color="gray" component={Link} to="/login" className={className}>
      Login
    </Button>
  );
}

export default LoginLogoutToggle;