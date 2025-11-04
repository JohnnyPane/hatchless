import { Title, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";
import AddLogoDrawer from "./AddLogoDrawer.jsx";
import {notifications} from "@mantine/notifications";

const flyShopInputs = [
  { name: "name", label: "Name", placeholder: "Enter fly shop name", type: "text", span: 4 },
  { name: "website_url", label: "Website URL", placeholder: "Enter website URL", type: "text", span: 4 },
  { name: "email", label: "Shop Contact Email", placeholder: "Enter contact email", type: "text", span: 4 },
  { name: "description", label: "Description", placeholder: "Enter fly shop description", type: "textArea", span: 12 },
  { name: "address_attributes.address_1", label: "Address Line 1", placeholder: "Enter address line 1", type: "text", span: 4 },
  { name: "address_attributes.address_2", label: "Address Line 2", placeholder: "Enter address line 2", type: "text", span: 4 },
  { name: "address_attributes.city", label: "City", placeholder: "Enter city", type: "text", span: 4 },
  { name: "address_attributes.state", label: "State", placeholder: "Enter state", type: "text", span: 4 },
  { name: "address_attributes.zip_code", label: "Zip Code", placeholder: "Enter zip code", type: "text", span: 4 },
  { name: "address_attributes.country", label: "Country", placeholder: "Enter country", type: "text", span: 4 },
];

const MyFlyShopSettings = ({ flyShop }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const updateFlyShop = useUpdateResource('fly_shops');

  const form = useForm({
    initialValues: {
      name: flyShop.name || '',
      description: flyShop.description || '',
      website_url: flyShop.website_url || '',
      email: flyShop.email || '',
      address_attributes: {
        address_1: flyShop.address?.address_1 || '',
        address_2: flyShop.address?.address_2 || '',
        city: flyShop.address?.city || '',
        state: flyShop.address?.state || '',
        zip_code: flyShop.address?.zip_code || '',
        country: flyShop.address?.country || '',
      }
    },
  });

  const handleSubmit = async (values) => {
    try {
      await updateFlyShop.mutateAsync({ id: flyShop.id, ...values });
      notifications.show({
        title: 'Success',
        message: 'Fly shop settings updated successfully!',
        color: 'green',
        position: 'top-right',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update fly shop settings. Please try again.',
        color: 'red',
        position: 'top-right',
      });
    }
  }

  return (
    <div className="page">'
      <div className="flex row margin-bottom">
        <Title order={2} className="margin-right">My Fly Shop Settings</Title>

        <Button onClick={openDrawer} variant="outline">Add Fly Shop Logo</Button>
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HatchlessGridInputs inputs={flyShopInputs} form={form} />

        <Button type="submit" className="margin-top">Save Settings</Button>
      </form>

      <AddLogoDrawer flyShop={flyShop} onClose={closeDrawer} opened={drawerOpened} />
    </div>
  );
}

export default MyFlyShopSettings;