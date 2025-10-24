import { useParams } from "react-router-dom";
import useResource from "../../hooks/useResource.js";
import { useMe } from "../../hooks/useMe.js";

const FlyShop = () => {
  const { id } = useParams();
  const { data: flyShop, isLoading, isError, error } = useResource('fly_shops', id);
  const { data: user } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{flyShop.name}</h1>
      <p>{flyShop.description}</p>
      {user && <p>Welcome back, {user.name}!</p>}
    </div>
  );
}

export default FlyShop;