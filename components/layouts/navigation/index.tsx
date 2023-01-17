import { User } from '@supabase/supabase-js';
import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  MdBookmark,
  MdEmail,
  MdHome,
  MdList,
  MdMoreHoriz,
  MdNotifications,
  MdPerson,
  MdTag,
} from 'react-icons/md';
import styles from './styles.module.css';

type NavigationLayoutProps = {
  children: ReactNode;
  user: User | null;
};

const NavItem = ({
  icon,
  title,
  selected,
}: {
  icon: ReactNode;
  title: string;
  selected?: boolean;
}) => {
  return (
    <div className={clsx(styles.navItem, selected && styles.selected)}>
      <div className={styles.iconContainer}>{icon}</div>
      <p>{title}</p>
    </div>
  );
};

const NavigationLayout = ({ children, user }: NavigationLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <p>Hello, </p>
        <p>{user?.user_metadata?.display_name}</p>
      </div>
      <NavItem selected title="Home" icon={<MdHome size={20} />} />
      <NavItem title="Explore" icon={<MdTag size={20} />} />
      <NavItem title="Notifications" icon={<MdNotifications size={20} />} />
      <NavItem title="Messages" icon={<MdEmail size={20} />} />
      <NavItem title="Bookmarks" icon={<MdBookmark size={20} />} />
      <NavItem title="List" icon={<MdList size={20} />} />
      <NavItem title="Profile" icon={<MdPerson size={20} />} />
      <NavItem title="More" icon={<MdMoreHoriz size={20} />} />
      <div />
      {children}
    </div>
  );
};

export default NavigationLayout;
