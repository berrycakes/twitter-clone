import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'muted';
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant,
  disabled,
  fullWidth = true,
  ...other
}: ButtonProps) => {
  const variantStyle = variant ? styles[variant] : styles.primary;
  return (
    <button
      className={clsx(
        variantStyle,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        styles.button
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
