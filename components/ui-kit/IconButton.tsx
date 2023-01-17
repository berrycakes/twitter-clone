import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

const IconButton = ({ icon, disabled = false, ...other }: IconButtonProps) => {
  return (
    <button className={clsx(disabled && styles.disabled, styles.iconButton)} {...other}>
      {icon}
    </button>
  );
};

export default IconButton;
