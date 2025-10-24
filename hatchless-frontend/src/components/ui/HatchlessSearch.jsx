import { useState, useEffect } from "react";
import { Select, MultiSelect, Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const HatchlessSearch = ({ onChange, nameKey = 'name', searchType = 'input' }) => {
  const [localSearch, setLocalSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(localSearch, 100);
  const { setSearch } = useResourceContext();

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  switch (searchType) {
    case 'multiSelect':
      return <MultiSelectSearch search={localSearch} setSearch={setLocalSearch} onChange={onChange} nameKey={nameKey} />;
    case 'select':
      return <SelectSearch search={localSearch} setSearch={setLocalSearch} onChange={onChange} nameKey={nameKey} />;
    default:
      return <InputSearch search={localSearch} setSearch={setLocalSearch} />;
  }
}

const MultiSelectSearch = ({ search, setSearch, onChange, nameKey }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const { data } = useResourceContext();

  const searchData = data?.map((resource) => ({
    value: String(resource.id),
    label: resource.attributes?.[nameKey] || 'Unnamed Resource',
  })) || [];

  const onMultiChange = (values) => {
    const selectedItems = searchData.filter(item => values.includes(item.value));
    setSelectedValues(selectedItems)
    onChange(values);
  }

  const multiSelectSearchData = [...searchData.filter((item) => !selectedValues.some(selected => selected.value === item.value)), ...selectedValues];

  return (
    <MultiSelect
      placeholder="Search resources..."
      searchable
      clearable
      data={multiSelectSearchData}
      searchValue={search}
      onSearchChange={setSearch}
      onChange={onMultiChange}
      rightSection={<IconSearch size={16} />}
    />
  );
}

const SelectSearch = ({ search, setSearch, onChange, nameKey }) => {
  const { data } = useResourceContext();

  const searchData = data?.map((resource) => ({
    value: String(resource.id),
    label: resource.attributes?.[nameKey] || 'Unnamed Resource',
  })) || [];

  return (
    <Select
      placeholder="Search resources..."
      searchable
      clearable
      rightSection={<IconSearch size={16} />}
      data={searchData}
      searchValue={search}
      onSearchChange={setSearch}
      onChange={onChange}
    />
  );
}

const InputSearch = ({ search, setSearch }) => {
  return (
    <Input
      placeholder="Search resources..."
      rightSection={<IconSearch size={16} />}
      value={search}
      onChange={(event) => {
        const value = event.currentTarget.value;
        setSearch(value);
      }}
    />
  )
}

export default HatchlessSearch;
