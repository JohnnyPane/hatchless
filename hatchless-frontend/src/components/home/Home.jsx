import { useState } from "react";
import { Title, Text } from "@mantine/core";

import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import useResource from "../../hooks/useResource.js";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import LoginLogoutToggle from "../auth/LoginLogoutToggle.jsx";

const Home = () => {
  const [selectedRiverId, setSelectedRiverId] = useState(null);
  const { data: river } = useResource("rivers", selectedRiverId);

  const handleRiverSelect = (value) => {
    setSelectedRiverId(value);
  }

  return (
    <div>
      <h1>Welcome to Hatchless</h1>
      <LoginLogoutToggle className="mt-4" />

      <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name" }}>
        <HatchlessSearch onChange={handleRiverSelect} searchType='select' />
      </ResourceProvider>

      {river && (
        <div className="margin-top">
          <Title order={2}>{river.name}</Title>
          <Text>{river.description}</Text>

          {river.fly_shops.map((flyShop => (
            <div key={flyShop.id} className="margin-top-small">
              <Title order={3}>{flyShop.name}</Title>
              <Text>{flyShop.description}</Text>
            </div>
          )))}
        </div>
      )}

    </div>
  );
}

export default Home;