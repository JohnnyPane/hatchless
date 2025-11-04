import { Drawer, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUploadResourceImages } from "../../hooks/useResourceMutations.js";
import HatchlessImageUploader from "../ui/HatchlessImageUploader.jsx";
import { notifications } from "@mantine/notifications";

const AddLogoDrawer = ({ opened, onClose, flyShop }) => {
  const uploadFlyShopImages = useUploadResourceImages('fly_shops');

  const imageForm = useForm({
    initialValues: {
      imageFile: null,
    },
  });

  const uploadLogo = async () => {
    const flyShopId = flyShop.id;
    const imageFile = imageForm.values.imageFile;

    try {
      await uploadFlyShopImages.mutateAsync({ id: flyShopId, files: [imageFile] });
      notifications.show({
        title: 'Success',
        message: 'Fly shop logo uploaded successfully!',
        color: 'green',
        position: 'top-right',
      });
      onClose();
      imageForm.reset();
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
    <Drawer opened={opened} position="bottom" onClose={onClose} title={<Text size="xl" className="bold">Add New Logo</Text> } padding="md" size="md">
      <div className="page">
        <HatchlessImageUploader
          onFileSelect={(file) => imageForm.setFieldValue('imageFile', file)}
          initialFile={imageForm.values.imageFile}
        />


        <Button mt="md" onClick={uploadLogo} disabled={!imageForm.values.imageFile}>
          Upload Logo
        </Button>
      </div>
    </Drawer>
  );
}

export default AddLogoDrawer;