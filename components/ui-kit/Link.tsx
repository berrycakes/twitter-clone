import { ReactNode } from 'react';
import NextLink from 'next/link';
import styles from './Link.module.css';
import clsx from 'clsx';

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: string;
};

const Link = ({ href, children, variant = 'primary' }: LinkProps) => {
  return (
    <NextLink href={href} className={clsx(styles.link, variant && styles[variant])}>
      {children}
    </NextLink>
  );
};

export default Link;
