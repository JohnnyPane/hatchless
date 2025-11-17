import { useEffect } from "react";
import { Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import useResource from "../../hooks/useResource.js";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";


const flyPackInputs = [
  { name: "name", label: "Name", placeholder: "Enter fly pack name", type: "text", span: 6, required: true },
  { name: "price_cents", label: "Price", placeholder: "Enter fly pack price", type: "price", span: 6, required: true },
  { name: "description", label: "Description", placeholder: "Enter fly pack description", type: "textArea", span: 12 },
  { name: "available_from", label: "Available From", placeholder: "Enter available from date", type: "date", span: 6 },
  { name: "available_to", label: "Available To", placeholder: "Enter available to date", type: "date", span: 6 },
];

const EditFlyPackForm = ({ flyPackId, onSuccess }) => {
  const { data: flyPack, isLoading } = useResource('fly_packs', flyPackId, { include: 'fly_pack_items' });
  const { mutateAsync: updateFlyPack } = useUpdateResource('fly_packs');

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price_cents: '',
      available_from: null,
      available_to: null,
    },
    transformValues: (values) => ({
      ...values,
      price_cents: Math.round(parseFloat(values.price_cents) * 100),
    }),
  });

  useEffect(() => {
    if (flyPack) {
      form.setValues({
        name: flyPack.name || '',
        description: flyPack.description || '',
        price_cents: (flyPack.price_cents / 100).toFixed(2) || '',
        available_from: new Date(flyPack.available_from) || null,
        available_to: new Date(flyPack.available_to) || null,
      });
    }
  }, [flyPack]);

  const handleSubmit = async (values) => {
    try {
      await updateFlyPack({ id: flyPackId, ...values });
      if (onSuccess) {
        onSuccess();
      }
      notifications.show({
        title: 'Success',
        message: 'Fly pack updated successfully!',
        color: 'green',
        position: 'top-right',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to update fly pack: ${error.message}`,
        color: 'red',
        position: 'top-right',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <HatchlessGridInputs inputs={flyPackInputs} form={form} />
      <div className="flex to-right">
        <Button type="submit" className="primary-button margin-80-t">Update Fly Pack</Button>
      </div>
    </form>
  );
}

export default EditFlyPackForm;