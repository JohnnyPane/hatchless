import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Hatchless</h1>
      <LoginLogoutToggle className="mt-4" />
    </div>
  );
}

export default Home;