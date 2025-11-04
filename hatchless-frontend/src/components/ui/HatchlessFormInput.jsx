import { TextInput, Textarea, Select } from "@mantine/core";

const HatchlessFormInput = ({ inputConfig, form }) => {
  const { name, label, placeholder, type } = inputConfig;

  switch (type) {
    case "textArea":
      return (
        <Textarea
          label={label}
          placeholder={placeholder}
          {...form.getInputProps(name)}
        />
      );
    case "select":
      return (
        <Select
          label={label}
          placeholder={placeholder}
          data={inputConfig.data || []}
          {...form.getInputProps(name)}
        />
      );
    case "text":
    default:
      return (
        <TextInput
          label={label}
          placeholder={placeholder}
          {...form.getInputProps(name)}
        />
      );
  }
}

export default HatchlessFormInput;