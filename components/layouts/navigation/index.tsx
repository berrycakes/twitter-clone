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
  condensed: boolean;
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

const NavigationLayout = ({
  children,
  user,
  condensed,
}: NavigationLayoutProps) => {
  const size = condensed ? 20 : 30;
  return (
    <div className={styles.container}>
      {condensed ? (
        <div className={styles.welcome}>
          <p>Hello, </p>
          <p>{user?.user_metadata?.display_name}</p>
        </div>
      ) : null}

      <NavItem
        selected
        title="Home"
        displayLabel={condensed}
        icon={<MdHome size={size} />}
      />
      <NavItem
        title="Explore"
        displayLabel={condensed}
        icon={<MdTag size={size} />}
      />
      <NavItem
        title="Notifications"
        displayLabel={condensed}
        icon={<MdNotifications size={size} />}
      />
      <NavItem
        title="Messages"
        displayLabel={condensed}
        icon={<MdEmail size={size} />}
      />
      <NavItem
        title="Bookmarks"
        displayLabel={condensed}
        icon={<MdBookmark size={size} />}
      />
      <NavItem
        title="List"
        displayLabel={condensed}
        icon={<MdList size={size} />}
      />
      <NavItem
        title="Profile"
        displayLabel={condensed}
        icon={<MdPerson size={size} />}
      />
      <NavItem
        title="More"
        displayLabel={condensed}
        icon={<MdMoreHoriz size={size} />}
      />
      <div />
      {children}
    </div>
  );
};

export default NavigationLayout;
