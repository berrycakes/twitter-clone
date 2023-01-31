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
import { useIsDesktop } from '../../../hooks/mediaQuery';
import styles from './styles.module.css';

type NavigationLayoutProps = {
  children: ReactNode;
  user: User | null;
};

const NavItem = ({
  icon,
  title,
  selected,
  displayLabel,
}: {
  icon: ReactNode;
  title: string;
  selected?: boolean;
  displayLabel: boolean;
}) => {
  return (
    <div className={clsx(styles.navItem, selected && styles.selected)}>
      <div className={styles.iconContainer}>{icon}</div>
      {displayLabel ? <p>{title}</p> : null}
    </div>
  );
};

const NavigationLayout = ({ children, user }: NavigationLayoutProps) => {
  const isDesktop = useIsDesktop();
  const size = isDesktop ? 20 : 30;
  return (
    <div className={styles.container}>
      {isDesktop ? (
        <div className={styles.welcome}>
          <p>Hello, </p>
          <p>{user?.user_metadata?.display_name}</p>
        </div>
      ) : null}

      <NavItem
        selected
        title="Home"
        displayLabel={isDesktop}
        icon={<MdHome size={size} />}
      />
      <NavItem
        title="Explore"
        displayLabel={isDesktop}
        icon={<MdTag size={size} />}
      />
      <NavItem
        title="Notifications"
        displayLabel={isDesktop}
        icon={<MdNotifications size={size} />}
      />
      <NavItem
        title="Messages"
        displayLabel={isDesktop}
        icon={<MdEmail size={size} />}
      />
      <NavItem
        title="Bookmarks"
        displayLabel={isDesktop}
        icon={<MdBookmark size={size} />}
      />
      <NavItem
        title="List"
        displayLabel={isDesktop}
        icon={<MdList size={size} />}
      />
      <NavItem
        title="Profile"
        displayLabel={isDesktop}
        icon={<MdPerson size={size} />}
      />
      <NavItem
        title="More"
        displayLabel={isDesktop}
        icon={<MdMoreHoriz size={size} />}
      />
      <div />
      {children}
    </div>
  );
};

export default NavigationLayout;
