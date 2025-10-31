import { useState } from "react";
import { Button } from '@mantine/core';
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import './Auth.scss';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex center column">
      {isLogin ? (<LoginForm />) : (<SignupForm />)}
      <Button onClick={toggleForm} variant="subtle">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </Button>
    </div>
  )
}

export default LoginSignup;