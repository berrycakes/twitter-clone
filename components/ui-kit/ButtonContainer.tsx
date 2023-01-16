import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './ButtonContainer.module.css';

type ButtonContainerProps = {
  children: ReactNode;
};

const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return <div className={clsx(styles.buttonContainer)}>{children}</div>;
};

export default ButtonContainer;
