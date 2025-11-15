import { TextInput, Textarea, NumberInput, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCurrencyDollar } from "@tabler/icons-react";

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
    case "date":
      return (
        <DatePickerInput
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          {...form.getInputProps(name)}
        />
      );
    case "price":
      return (
        <NumberInput
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          leftSection={<IconCurrencyDollar size={16} />}
          decimalScale={2}
          fixedDecimalScale
          min={0}
          step={0.01}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '$ '
          }
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