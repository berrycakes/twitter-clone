import { ReactNode } from 'react';
import Breadcrumbs from '../../breadcrumbs';
import styles from './styles.module.css';

type TimelineLayoutProps = {
  children: ReactNode;
};

const TimelineLayout = ({ children }: TimelineLayoutProps) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h6>Home</h6>
      {children}
    </div>
  );
};

export default TimelineLayout;
