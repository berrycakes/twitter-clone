import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  width?: number;
  height?: number;
  outlined?: boolean;
}

const IconButton = ({
  icon,
  disabled = false,
  outlined = true,
  width = 24,
  height = 24,
  ...other
}: IconButtonProps) => {
  return (
    <button
      style={{ width: width, height: height }}
      className={clsx(
        disabled && styles.disabled,
        outlined && styles.outlined,
        styles.iconButton
      )}
      {...other}
    >
      {icon}
    </button>
  );
};

export default IconButton;
