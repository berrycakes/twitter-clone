import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'muted';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  variant,
  disabled,
  fullWidth,
  loading,
  ...other
}: ButtonProps) => {
  const variantStyle = variant ? styles[variant] : styles.primary;
  return (
    <button
      className={clsx(
        variantStyle,
        disabled && styles.disabled,
        fullWidth ? styles.fullWidth : styles.normalWidth,
        styles.button
      )}
      {...other}
    >
      <div className={styles.flexRow}>
        {children}
        {loading ? <Spinner type="ring" /> : null}
      </div>
    </button>
  );
};

export default Button;
