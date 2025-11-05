import { useNavigate } from "react-router-dom";
import { Button, Textarea, Text, Fieldset } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useCreateResource, useUploadResourceImages } from "../../hooks/useResourceMutations.js";
import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import HatchlessSearch from "../ui/HatchlessSearch.jsx";
import HatchlessImageUploader from "../ui/HatchlessImageUploader.jsx";


const PostForm = () => {
  const navigate = useNavigate();
  const createPost = useCreateResource('posts');
  const uploadImages = useUploadResourceImages('posts');

  const form = useForm({
    initialValues: {
      caption: '',
      river_id: null,
    }
  });

  const imageForm = useForm({
    initialValues: {
      images: [],
    }
  });

  const handleRiverSelect = (river) => {
    form.setFieldValue('river_id', river ? river.id : null);
  }

  const handleImageUpload = (uploadedImages) => {
    imageForm.setFieldValue('images', uploadedImages);
  }

  const handleSubmit = async (values) => {
    try {
      const post = await createPost.mutateAsync(values);

      if (imageForm.values.images.length > 0) {
        try {
          await uploadImages.mutateAsync({ id: post.id, files: imageForm.values.images });
        } catch (error) {
          notifications.show({ message: 'Post created but failed to upload images.', color: 'yellow' });
          return;
        }
      }
      notifications.show({ message: 'Post created successfully!', color: 'green' });
      navigate(`/feed`);
    } catch (error) {
      notifications.show({ message: 'Failed to create post.', color: 'red' });
    }
  }

  return (
    <Fieldset className="page margin-top margin-bottom" style={{ maxWidth: 700, backgroundColor: "#F7F7F0" }} legend="Create New Post">
      <form onSubmit={form.onSubmit(handleSubmit)}>

        <HatchlessImageUploader onFilesSelect={handleImageUpload} />

        <Textarea
          label="Caption"
          placeholder="What's going on out there?"
          {...form.getInputProps('caption')}
          required
          minRows={4}
          mb="md"
          mt="lg"
        />

        <Text size="sm">Tag a river</Text>
        <ResourceProvider resourceName="rivers" initialParams={{ searchColumn: "name", perPage: 10 }}>
          <HatchlessSearch
            searchLabel="rivers"
            placeholder="Search for rivers to tag in your post"
            searchType="select"
            onChange={handleRiverSelect}
            {...form.getInputProps('river_id')}
          />
        </ResourceProvider>

        <div className="flex full-width to-right align-end">
          <Button type="submit" style={{ width: 240 }} className="margin-top">Create Post</Button>
        </div>
      </form>
    </Fieldset>

  );
};

export default PostForm;
