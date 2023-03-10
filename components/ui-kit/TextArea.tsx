import clsx from 'clsx';
import { FieldError } from 'react-hook-form';
import { MdStars } from 'react-icons/md';
import styles from './TextArea.module.css';

type TextAreaProps = {
  type: 'create' | 'reply';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: FieldError;
  rows?: number;
  defaultValue?: string;
};

type FooterProps = {
  type: 'create' | 'reply';
  charCount: number;
};

const Footer = ({ type, charCount }: FooterProps) => {
  return (
    <div className={styles.footer}>
      {type === 'create' ? (
        <p className={styles.createFooter}>
          <MdStars size={14} /> Everyone can reply
        </p>
      ) : (
        <div />
      )}
      <p className={styles.charCount}>{charCount} / 225</p>
    </div>
  );
};

const TextArea = (props: TextAreaProps) => {
  const {
    value,
    label,
    placeholder,
    onChange,
    error,
    type,
    rows = 4,
    defaultValue,
  } = props;

  return (
    <div className={styles.root}>
      {label ? (
        <label
          htmlFor="input-field"
          className={clsx(styles.label, error && styles.error)}
        >
          {label}
        </label>
      ) : null}
      <div className={clsx(styles.inputContainer, error && styles.inputError)}>
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(styles.input, error && styles.inputError)}
          defaultValue={defaultValue}
        />
        <Footer type={type} charCount={value.length || 0} />
      </div>
      {!!error ? (
        <span className={clsx(styles.helperText, error && styles.error)}>
          {error.message}
        </span>
      ) : null}
    </div>
  );
};

export default TextArea;
