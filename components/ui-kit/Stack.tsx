import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Stack.module.css';

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  row?: boolean;
  column?: boolean;
  padding?: number | string;
  margin?: number | string;
  align?: string;
  justify?: string;
  gap?: number;
}

const Stack = ({
  row,
  column,
  padding,
  margin,
  align,
  justify,
  gap,
  children,
  className,
  ...other
}: StackProps) => {
  return (
    <div
      style={{
        padding: padding,
        margin: margin,
        alignItems: align,
        justifyContent: justify,
        rowGap: gap,
        columnGap: gap,
      }}
      className={clsx(
        styles.stack,
        className,
        row && styles.row,
        column && styles.column
      )}
      {...other}
    >
      {children}
    </div>
  );
};

export default Stack;
