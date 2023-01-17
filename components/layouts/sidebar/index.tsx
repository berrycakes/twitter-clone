import { ReactNode } from 'react';
import Card from '../../ui-kit/Card';
import styles from './styles.module.css';

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <div className={styles.container}>
      <Card padding="1rem" className={styles.card}>
        <h6>Who to follow</h6>
        {children}
      </Card>
    </div>
  );
};

export default SidebarLayout;
