import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className, ...other }: CardProps) => {
  return (
    <div className={clsx(styles.card, className)} {...other}>
      {children}
    </div>
  );
};

export default Card;
