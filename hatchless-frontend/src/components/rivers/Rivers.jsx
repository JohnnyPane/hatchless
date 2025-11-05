import { useNavigate } from "react-router-dom";
import { Title } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import HatchlessTablePage from "../ui/HatchlessTablePage.jsx";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";

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

      <HatchlessTablePage columns={riversTableData} onRowClick={onRowClick} resourceName="rivers" />
    </div>
  );
}

export default Rivers;