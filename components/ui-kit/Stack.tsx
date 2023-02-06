import clsx from 'clsx';
import { forwardRef, HTMLAttributes, LegacyRef, ReactNode } from 'react';
import styles from './Stack.module.css';

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  row?: boolean;
  column?: boolean;
  divider?: boolean;
  padding?: number | string;
  margin?: number | string;
  align?: string;
  justify?: string;
  gap?: number;
  fullWidth?: boolean;
}

const Stack = forwardRef(
  (props: StackProps, ref: LegacyRef<HTMLDivElement>) => {
    const {
      row,
      column,
      divider,
      padding,
      margin,
      align,
      justify,
      gap,
      fullWidth = true,
      children,
      className,
      ...other
    } = props;
    return (
      <div
        ref={ref}
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
          column && styles.column,
          divider && styles.divider,
          fullWidth && styles.fullWidth
        )}
        {...other}
      >
        {children}
      </div>
    );
  }
);

export default Stack;
