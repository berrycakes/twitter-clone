import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  width?: number;
  height?: number;
}

const IconButton = ({
  icon,
  disabled = false,
  width = 24,
  height = 24,
  ...other
}: IconButtonProps) => {
  return (
    <button
      style={{ width: width, height: height }}
      className={clsx(disabled && styles.disabled, styles.iconButton)}
      {...other}
    >
      {icon}
    </button>
  );
};

export default IconButton;
