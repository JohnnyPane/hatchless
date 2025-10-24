import { TextInput, Textarea } from "@mantine/core";

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