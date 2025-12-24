import { useNavigate } from "react-router-dom";
import { Title } from "@mantine/core";
import { ResourceProvider } from "../../contexts/ResourceContext";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import ResponsiveList from "../ui/ResponsiveList.jsx";
import FlyShopCard from "./FlyShopCard.jsx";

const tableColumns = [
  { accessor: "logo_url", label: "", type: "image", isLogo: true },
  { accessor: "name", label: "Name" , type: "text" },
  { accessor: "website_url", label: "Website", type: "text" },
  { accessor: "description", label: "Description", type: "text" },
]

const FlyShops = ({ extraParams = {} }) => {
  const navigate = useNavigate();

  const onRowClick = (flyShop) => {
    navigate(`/fly_shops/${flyShop.id}`);
  }

  return (
    <div className="page">
      <Title order={2} className="center-text margin">Fly Shops</Title>

      <ResourceProvider resourceName="fly_shops" initialParams={{ searchColumn: "name", ...extraParams }}>

        <div className="flex row to-right margin-4-b">
          <HatchlessSearch config={{ style: { width: 300 } }} resourceName="fly_shops" searchLabel="Fly Shops" />
        </div>

        <ResponsiveList CardComponent={FlyShopCard} resourceName="fly_shops" onClick={onRowClick} columns={tableColumns} />
      </ResourceProvider>
    </div>
  );
}

export default FlyShops;