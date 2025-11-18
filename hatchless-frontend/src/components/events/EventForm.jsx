import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { Title, Button, Card, Grid } from '@mantine/core';

import { useCreateResource, useUploadResourceImages } from "../../hooks/useResourceMutations.js";
import HatchlessImageUploader from "../ui/HatchlessImageUploader.jsx";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";
import { notifications } from "@mantine/notifications";

const eventInputs = [
  { name: "name", label: "Name", placeholder: "Enter event name", type: "text", span: 6, required: true },
  { name: "location", label: "Location", placeholder: "Enter event location", type: "text", span: 6 },
  { name: "description", label: "Description", placeholder: "Enter event description", type: "textArea", span: 12 },
  { name: "start_time", label: "Start Time", type: "dateTime", span: 6 },
  { name: "end_time", label: "End Time", type: "dateTime", span: 6 },
  { name: "capacity", label: "Capacity", placeholder: "Enter event capacity", type: "number", span: 6 },
  { name: "price_cents", label: "Price", placeholder: "Enter price", type: "price", span: 6, required: true },
];

const EventForm = () => {
  const createEvent = useCreateResource('events');
  const uploadImages = useUploadResourceImages('events');

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      start_time: null,
      end_time: null,
      location: '',
      capacity: '',
      images: [],
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      location: (value) => (value ? null : 'Location is required'),
      start_time: (value) => (value ? null : 'Start time is required'),
      end_time: (value) => (value ? null : 'End time is required'),
    },
    transformValues: (values) => ({
      ...values,
      price_cents: Math.round(values.price_cents * 100),
    }),
  });

  const handleImageUpload = (uploadedImages) => {
    form.setFieldValue('images', uploadedImages);
  }

  const handleSubmit = async (values) => {
    const { images, ...eventData } = values;

    try {
      const newEvent = await createEvent.mutateAsync(eventData);
      form.reset();
      if (values.images.length > 0) {
        try {
          await uploadImages.mutateAsync({ id: newEvent.id, files: images });
        } catch (error) {
          notifications.show({
            title: 'Image Upload Failed',
            message: 'Event was created but image upload failed.',
            color: 'yellow',
          });
        }
      }
      notifications.show({
        title: 'Event Created',
        message: `${newEvent.name} has been created successfully.`,
        color: 'green',
        position: "top-right"
      });

      navigate(`/fly_shops/${newEvent.fly_shop_id}/my_fly_shop?tab=events`);
    } catch (error) {
      notifications.show({
        title: 'Event Creation Failed',
        message: 'There was an error creating the event. Please try again.',
        color: 'red',
      });
    }
  }

  const submittable = form.isValid();

  return (
    <div className="page">
      <Card size="md" className="card">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={3} className="margin-bottom">Create New Event</Title>

          <Grid>
            <Grid.Col span={6}>
              <HatchlessImageUploader maxFileCount={1} onFilesSelect={handleImageUpload} />
            </Grid.Col>

            <Grid.Col span={6}>
              <HatchlessGridInputs form={form} inputs={eventInputs} />
            </Grid.Col>
          </Grid>

          <div className="flex to-right">
            <Button type="submit" className="margin-top primary-button" disabled={!submittable}>Create Event</Button>
          </div>
        </form>
      </Card>

    </div>
  );
}

export default EventForm;