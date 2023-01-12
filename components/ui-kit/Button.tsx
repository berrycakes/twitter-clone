import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...other }: ButtonProps) => {
  return (
    <button className={styles.button} {...other}>
      {children}
    </button>
  );
};

export default Button;
