import { useForm } from "@mantine/form";
import { Button, Text } from "@mantine/core";
import { useCreateResource } from "../../hooks/useResourceMutations.js";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import { notifications } from "@mantine/notifications";
import FlyPackItemFormInputs from "./FlyPackItemFormInputs.jsx";

const flyPackInputs = [
  { name: "name", label: "Name", placeholder: "Enter fly pack name", type: "text", span: 6, required: true },
  { name: "price_cents", label: "Price", placeholder: "Enter fly pack price", type: "price", span: 6, required: true },
  { name: "description", label: "Description", placeholder: "Enter fly pack description", type: "textArea", span: 12 },
  { name: "available_from", label: "Available From", placeholder: "Enter available from date", type: "date", span: 6 },
  { name: "available_to", label: "Available To", placeholder: "Enter available to date", type: "date", span: 6 },
];

const FlyPackForm = ({ onSuccess }) => {
  const createFlyPack = useCreateResource('fly_packs');

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price_cents: '',
      available_from: null,
      available_to: null,
      fly_pack_items_attributes: [],
      fish_ids: [],
    },
    transformValues: (values) => ({
      ...values,
      price_cents: Math.round(parseFloat(values.price_cents) * 100),
    }),
  });

  const handleSubmit = async (values) => {
    try {
      await createFlyPack.mutateAsync(values);
      form.reset();
      notifications.show({
        title: 'Success',
        message: 'Fly pack created successfully!',
        color: 'green',
        position: 'top-right',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to create fly pack: ${error.message}`,
        color: 'red',
        position: 'top-right',
      });
    }
  };

  const onFishSelect = (selectedFishIds) => {
    form.setFieldValue("fish_ids", selectedFishIds)
  }

  const addItem = () => form.setFieldValue('fly_pack_items_attributes', [
    ...form.values.fly_pack_items_attributes,
    { fly_pattern_id: null, quantity: 1 }
  ]);
  const flyPackItems = form.values.fly_pack_items_attributes || [];

  const submittable = form.values.name && flyPackItems.length > 0 && form.values.price_cents > 0;

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HatchlessGridInputs inputs={flyPackInputs} form={form} />

        <ResourceProvider resourceName="fly_patterns" initialParams={{ searchColumn: 'name' }}>
          {flyPackItems.map((item, index) => (
            <div key={index}>
              <FlyPackItemFormInputs form={form} quantity={item.quantity} itemIndex={index} />
            </div>
          ))}

          <Button variant="default" className="margin-top" onClick={addItem} style={{ marginBottom: '20px' }}>Add Fly Pattern to Pack</Button>
        </ResourceProvider>

        <ResourceProvider resourceName="fish" initialParams={{ searchColumn: 'common_name' }}>
          <Text>Add Fish Species</Text>
          <Text size="sm" color="dimmed">Adding fish species helps anglers make decisions about what to buy and makes your fly packs more easily findable</Text>
          <HatchlessSearch nameKey="common_name" searchType="multiSelect" onChange={onFishSelect} searchLabel="Fish Species" />
        </ResourceProvider>

        <div className="flex to-right">
          <Button type="submit" disabled={!submittable} className="primary-button" mt="md">Create Fly Pack</Button>
        </div>
      </form>
    </div>
  );
};

export default FlyPackForm;