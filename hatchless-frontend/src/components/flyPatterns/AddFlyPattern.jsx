import { useForm } from "@mantine/form";
import { Button, Title } from "@mantine/core";
import { useCreateResource, useUploadResourceImages } from "../../hooks/useResourceMutations.js";
import HatchlessImageUploader from "../ui/HatchlessImageUploader.jsx";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";
import { notifications } from "@mantine/notifications";

const flyPatternInputs = [
  { name: "name", label: "Name", placeholder: "Enter fly pattern name", type: "text", span: 6, required: true },
  {
    name: "category",
    label: "Category",
    placeholder: "Enter fly pattern category",
    type: "select",
    data: ['Dry', 'Nymph', 'Streamer', 'Wet', 'Emerger', 'Terrestrial'],
    span: 6,
    required: true
  },
  { name: "notes", label: "Notes", placeholder: "Enter any notes about the fly pattern", type: "textArea", span: 12 },
]


const AddFlyPattern = () => {
  const createFlyPattern = useCreateResource('fly_patterns');
  const uploadResourceImages = useUploadResourceImages('fly_patterns');

  const form = useForm({
    initialValues: {
      name: '',
      notes: '',
      category: '',
      imageFile: null,
    },
  });

  const handleSubmit = async (values) => {
    const payload = {
      name: values.name,
      notes: values.notes,
      category: values.category,
    };

    try {
      const newFlyPattern = await createFlyPattern.mutateAsync(payload);

      if (values.imageFile) {
        await uploadResourceImages.mutateAsync({ id: newFlyPattern.id, files: [values.imageFile] });
      }
      form.reset();
      notifications.show({
        title: 'Success',
        message: 'Fly pattern added successfully!',
        color: 'green',
        position: 'top-right',
      });
    } catch (error) {
      console.error("Failed to add fly pattern:", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to add fly pattern. Please try again.',
        color: 'red',
        position: 'top-right',
      });
    }
  }

  const formCompleted = form.values.name && form.values.category;

  return (
    <div className="page">
      <Title order={3}>Add New Fly Pattern</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HatchlessGridInputs inputs={flyPatternInputs} form={form} />

        <div style={{ marginTop: '1rem' }}>
          <HatchlessImageUploader
            onFileSelect={(file) => form.setFieldValue('imageFile', file)}
            initialFile={form.values.imageFile}
          />
        </div>

        <Button type="submit" mt="md" disabled={!formCompleted}>Add Fly Pattern</Button>
      </form>
    </div>
  );
}

export default AddFlyPattern;