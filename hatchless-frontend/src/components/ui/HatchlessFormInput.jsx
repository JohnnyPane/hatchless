import { TextInput, Textarea, Select } from "@mantine/core";

const HatchlessFormInput = ({ inputConfig, form }) => {
  const { name, label, placeholder, type } = inputConfig;
  const disabled = inputConfig.disabled || false;

  switch (type) {
    case "textArea":
      return (
        <Textarea
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          {...form.getInputProps(name)}
        />
      );
    case "select":
      return (
        <Select
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          data={inputConfig.data || []}
          {...form.getInputProps(name)}
        />
      );
    case "text":
    default:
      return (
        <TextInput
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          {...form.getInputProps(name)}
        />
      );
  }
}

export default HatchlessFormInput;