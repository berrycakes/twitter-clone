import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './ButtonContainer.module.css';

type ButtonContainerProps = {
  children: ReactNode;
  marginTop?: boolean;
};

const ButtonContainer = ({ children, marginTop = true }: ButtonContainerProps) => {
  return (
    <div className={clsx(styles.buttonContainer, marginTop && styles.marginTop)}>{children}</div>
  );
};

export default ButtonContainer;
