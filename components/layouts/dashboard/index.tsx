import { ReactNode } from 'react';
import styles from './styles.module.css';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default DashboardLayout;
