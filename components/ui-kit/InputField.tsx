import { FieldError } from 'react-hook-form'
import styles from './InputField.module.css'

type InputFieldProps = {
  label: string
  placeholder?: string
  type: 'text' | 'number' | 'email' | 'password'
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: FieldError
}

const InputField = (props: InputFieldProps) => {
  const { value, label, placeholder, type, onChange, error } = props
  return (
    <div className={styles.root}>
      {label ? <label htmlFor="input-field">{label}</label> : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
      />
      {!!error ? <span className={styles.error}>{error.message}</span> : null}
    </div>
  )
}

export default InputField
