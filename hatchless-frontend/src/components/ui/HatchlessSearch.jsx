import { useState, useEffect } from "react";
import { Select, MultiSelect, Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const HatchlessSearch = ({ onChange, nameKey = 'name', searchType = 'input', config, icon = null, debounceValue = 100, searchLabel = "resources" }) => {
  const [localSearch, setLocalSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(localSearch, debounceValue);
  const { setSearch } = useResourceContext();

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const placeholderText = `Search ${searchLabel}...`;

  switch (searchType) {
    case 'multiSelect':
      return <MultiSelectSearch search={localSearch} setSearch={setLocalSearch} onChange={onChange} nameKey={nameKey} placeholderText={placeholderText} />;
    case 'select':
      return <SelectSearch search={localSearch} setSearch={setLocalSearch} onChange={onChange} nameKey={nameKey} placeholderText={placeholderText} />;
    default:
      return <InputSearch search={localSearch} setSearch={setLocalSearch} config={config} icon={icon} placeholderText={placeholderText} />;
  }
}

const MultiSelectSearch = ({ search, setSearch, onChange, nameKey, placeholderText }) => {
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
      placeholder={placeholderText}
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

const SelectSearch = ({ search, setSearch, onChange, nameKey, placeholderText }) => {
  const { data } = useResourceContext();

  const searchData = data?.map((resource) => ({
    value: String(resource.id),
    label: resource.attributes?.[nameKey] || 'Unnamed Resource',
  })) || [];

  return (
    <Select
      placeholder={placeholderText}
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

const InputSearch = ({ search, setSearch, config, icon, placeholderText }) => {
  return (
    <Input
      placeholder={placeholderText}
      rightSection={icon ? icon : <IconSearch size={16} />}
      value={search}
      {...config}
      onChange={(event) => {
        const value = event.currentTarget.value;
        setSearch(value);
      }}
    />
  )
}

export default HatchlessSearch;
