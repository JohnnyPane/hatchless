import { useNavigate } from "react-router-dom";
import { Title } from "@mantine/core";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import ResponsiveList from "../ui/ResponsiveList.jsx";
import RiverCard from "./RiverCard.jsx";

const riversTableData = [
  { label: 'River', accessor: 'name', type: 'text' },
  { label: 'Water Type', accessor: 'water_type', type: 'text' },
  { label: 'Classification', accessor: 'designation', type: 'text' },
  { label: 'Classification System', accessor: 'designation_system', type: 'text' },
];

const searchConfig = {
  style: { width: 300 }
}

const Rivers = () => {
  const navigate = useNavigate();

  const onRowClick = (river) => {
    navigate(`/rivers/${river.id}`);
  }

  return (
    <div className="page">
      <Title className="center-text" order={2}>All Rivers</Title>
      <div className="flex row full-width to-right margin-4-b">
        <HatchlessSearch
          searchType='input'
          config={searchConfig}
          nameKey='name'
          debounceValue={200}
          searchLabel="rivers"
        />
      </div>

      <ResponsiveList resourceName="rivers" onClick={onRowClick} CardComponent={RiverCard} columns={riversTableData} />
    </div>
  );
}

export default Rivers;