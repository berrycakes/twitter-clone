import clsx from 'clsx';
import { MouseEventHandler, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import styles from './InputField.module.css';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'email' | 'password';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  helperText?: string;
};

type InputAdornmentProps = {
  type: string;
  isVisible: boolean;
  handleToggle: MouseEventHandler;
};

const InputAdornment = ({ type, isVisible, handleToggle }: InputAdornmentProps) => {
  if (type !== 'password') return null;
  return (
    <div className={styles.inputAdornment} onClick={handleToggle}>
      {isVisible ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
    </div>
  );
};

const InputField = (props: InputFieldProps) => {
  const { value, label, placeholder, type, onChange, error, helperText } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.root}>
      {label ? (
        <label htmlFor="input-field" className={clsx(styles.label, error && styles.error)}>
          {label}
        </label>
      ) : null}
      <div className={clsx(styles.inputContainer, error && styles.inputError)}>
        <input
          type={isVisible && type === 'password' ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(styles.input, error && styles.inputError)}
        />
        <InputAdornment type={type} isVisible={isVisible} handleToggle={handleToggle} />
      </div>
      {!!error ? (
        <span className={clsx(styles.helperText, error && styles.error)}>{error.message}</span>
      ) : !!helperText ? (
        <span className={clsx(styles.helperText)}>{helperText}</span>
      ) : null}
    </div>
  );
};

export default InputField;
