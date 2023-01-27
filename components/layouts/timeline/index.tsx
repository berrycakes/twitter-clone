import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { getKeyByValue, startCase } from '../../../helper/functions';
import { PATH } from '../../../routes/paths';
import Breadcrumbs from '../../breadcrumbs';
import styles from './styles.module.css';

type TimelineLayoutProps = {
  children: ReactNode;
};

const TimelineLayout = ({ children }: TimelineLayoutProps) => {
  const { pathname } = useRouter();
  const title = getKeyByValue(PATH, pathname);
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h6>{title === 'dashboard' ? 'Home' : startCase(title)}</h6>
      {children}
    </div>
  );
};

export default TimelineLayout;
