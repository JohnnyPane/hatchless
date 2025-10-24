import { useForm } from "@mantine/form";
import { Button, Card } from "@mantine/core";
import { useCreateResource } from "../../hooks/useResourceMutations.js";
import HatchlessFormInput from "../ui/HatchlessFormInput.jsx";

const formInputs = [
  { name: "name", label: "Fly Shop Name", placeholder: "Enter the name of the fly shop", type: "text" },
  { name: "description", label: "Description", placeholder: "Enter a brief description", type: "textArea" },
  { name: "website_url", label: "Website URL", placeholder: "Enter the website URL", type: "text" },
  { name: "phone_number", label: "Phone Number", placeholder: "Enter the phone number", type: "text" },
  { name: "email", label: "Email", placeholder: "Enter the email address", type: "text" },
];

const addressInputs = [
  { name: "address_attributes.address_1", label: "Address Line 1", placeholder: "Enter address line 1", type: "text" },
  { name: "address_attributes.address_2", label: "Address Line 2", placeholder: "Enter address line 2", type: "text" },
  { name: "address_attributes.city", label: "City", placeholder: "Enter the city", type: "text" },
  { name: "address_attributes.state", label: "State", placeholder: "Enter the state", type: "text" },
  { name: "address_attributes.zip_code", label: "Zip Code", placeholder: "Enter the zip code", type: "text" },
  { name: "address_attributes.country", label: "Country", placeholder: "Enter the country", type: "text" },
];

const FlyShopForm = () => {
  const { mutateAsync: createFlyShop } = useCreateResource("fly_shops");

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      website_url: "",
      phone_number: "",
      email: "",
      address_attributes: {
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      },
    },
  });

  const handleSubmit = async (values) => {
    try {
      await createFlyShop(values);
    } catch (error) {
      console.error("Failed to create fly shop:", error);
    }
  }

  return (
    <div className="page">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {formInputs.map((input) => (
            <HatchlessFormInput form={form} inputConfig={input} key={input.name} />
          ))}

          <h3>Address Information</h3>
          {addressInputs.map((input) => (
            <HatchlessFormInput
              form={form}
              inputConfig={input}
              key={input.name}
            />
          ))}
          <Button type="submit">Create Fly Shop</Button>
        </form>
      </Card>
    </div>
  );

}

export default FlyShopForm;