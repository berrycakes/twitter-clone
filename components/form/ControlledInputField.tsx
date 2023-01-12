import { useFormContext, Controller } from 'react-hook-form'
import InputField from '../ui-kit/InputField'

type ControlledInputFieldProps = {
  name: string
  label: string
  placeholder: string
  type: 'text' | 'number' | 'email' | 'password'
  rules?: {}
}

const ControlledInputField = (props: ControlledInputFieldProps) => {
  const { name, rules, label, placeholder, type } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <InputField
          value={field.value}
          onChange={field.onChange}
          error={error}
          label={label}
          placeholder={placeholder}
          type={type}
        />
      )}
    />
  )
}

export default ControlledInputField
