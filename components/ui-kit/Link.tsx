import { ReactNode } from 'react';
import NextLink from 'next/link';
import styles from './Link.module.css';

type LinkProps = {
  href: string;
  children: ReactNode;
};

const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href} className={styles.link}>
      {children}
    </NextLink>
  );
};

export default Link;
