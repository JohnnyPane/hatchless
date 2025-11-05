import { Drawer, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";

import { useMe } from '../../hooks/useMe.js';
import { useUploadResourceImages } from '../../hooks/useResourceMutations.js';
import HatchlessImageUploader from "../ui/HatchlessImageUploader.jsx";


const UserAvatarDrawer = ({ opened, onClose }) => {
  const { data: me } = useMe();
  const uploadAvatarImage = useUploadResourceImages('users');

  const form = useForm({
    initialValues: {
      avatar: me?.avatar || [],
    },
  });

  const onFileSelect = (file) => {
    form.setFieldValue('avatar', file[0]);
  };

  const uploadAvatar = async () => {
    const userId = me.id;
    const imageFile = form.values.avatar;

    try {
      await uploadAvatarImage.mutateAsync({ id: userId, files: [imageFile] });
      notifications.show({
        title: 'Success',
        message: 'Avatar uploaded successfully!',
        color: 'green',
        position: 'top-right',
      });
      onClose();
      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to upload fly shop logo. Please try again.',
        color: 'red',
        position: 'top-right',
      });
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Update Avatar"
      position="right"
      padding="xl"
      size="lg"
    >
      <HatchlessImageUploader
        onFilesSelect={onFileSelect}
        initialFile={form.values.avatar}
      />

      <Button mt="md" fullWidth onClick={uploadAvatar} disabled={!form.values.avatar}>
        Upload Avatar
      </Button>
    </Drawer>
  );
}

export default UserAvatarDrawer;