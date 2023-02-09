import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  padding?: string | number;
  fullWidth?: boolean;
}

const Card = ({
  children,
  className,
  padding = '4rem 1rem',
  fullWidth,
  ...other
}: CardProps) => {
  return (
    <div
      style={{ padding: padding }}
      className={clsx(styles.card, className, fullWidth && styles.fullWidth)}
      {...other}
    >
      {children}
    </div>
  );
};

export default Card;
