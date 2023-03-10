import { useFormContext, Controller } from 'react-hook-form';
import TextArea from '../ui-kit/TextArea';

type ControlledTextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type: 'create' | 'reply';
  rules?: {};
  rows?: number;
  defaultValue?: string;
};

const ControlledTextArea = (props: ControlledTextAreaProps) => {
  const { name, rules, label, placeholder, type, rows, defaultValue } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextArea
          rows={rows}
          value={field.value}
          onChange={field.onChange}
          error={error}
          label={label}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};

export default ControlledTextArea;
