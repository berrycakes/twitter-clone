import { useFormContext, Controller } from 'react-hook-form';
import InputField from '../ui-kit/InputField';

type ControlledInputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'email' | 'password';
  rules?: {};
  helperText?: string;
  defaultValue?: any;
};

const ControlledInputField = (props: ControlledInputFieldProps) => {
  const { name, rules, label, placeholder, type, helperText, defaultValue } =
    props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <InputField
          value={field.value}
          onChange={field.onChange}
          error={error}
          label={label}
          placeholder={placeholder}
          type={type}
          helperText={helperText}
        />
      )}
    />
  );
};

export default ControlledInputField;
