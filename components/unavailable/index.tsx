import React from 'react';
import Card from '../ui-kit/Card';
import Link from '../ui-kit/Link';
import styles from './styles.module.css';

const Unavailable = ({ message }: { message?: string }) => {
  return (
    <Card className={styles.container} padding="1.5rem">
      <p>{message ? message : 'This content is not available.'}</p>
      <Link href={'/'}>Back to home</Link>
    </Card>
  );
};

export default Unavailable;
