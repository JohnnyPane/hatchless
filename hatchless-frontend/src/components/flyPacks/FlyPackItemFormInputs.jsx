import { NumberInput, Grid, Text } from "@mantine/core";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";

const FlyPackItemFormInputs = ({ quantity, itemIndex, form }) => {
  const { setSearch } = useResourceContext();
  const handleFlyPatternSelect = (selectedFlyPatternId) => {
    form.setFieldValue(`fly_pack_items_attributes.${itemIndex}.fly_pattern_id`, selectedFlyPatternId);
    setSearch('');
  };

  const handleQuantityChange = (value) => {
    form.setFieldValue(`fly_pack_items_attributes.${itemIndex}.quantity`, value);
  };

  return (
    <Grid>
      <Grid.Col span={8}>
        <Text>Select a Fly Pattern to Add</Text>
        <HatchlessSearch searchType="select" onChange={handleFlyPatternSelect} searchLabel="Select Fly Patterns" />
      </Grid.Col>

      <Grid.Col span={4}>
        <NumberInput
          label="Quantity"
          placeholder="Enter quantity"
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
        />
      </Grid.Col>
    </Grid>
  );
}

export default FlyPackItemFormInputs;
