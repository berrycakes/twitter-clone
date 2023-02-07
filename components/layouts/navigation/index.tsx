import { User } from '@supabase/supabase-js';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  MdBookmark,
  MdEmail,
  MdHome,
  MdList,
  MdMenu,
  MdMoreHoriz,
  MdNotifications,
  MdPerson,
  MdTag,
} from 'react-icons/md';
import { useOnClickOutside } from 'usehooks-ts';
import { useIsMobile } from '../../../hooks/mediaQuery';
import { PATH } from '../../../routes/paths';
import IconButton from '../../ui-kit/IconButton';
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
  onClick,
}: {
  icon: ReactNode;
  title: string;
  selected?: boolean;
  displayLabel: boolean;
  onClick?: VoidFunction;
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.navItem,
        selected && styles.selected,
        onClick && styles.clickable
      )}
    >
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
  const { push, pathname } = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();
  const size = condensed ? 20 : 30;
  const ref = useRef(null);

  const toggleVisibility = () => {
    if (condensed) return null;
    setIsVisible(!isVisible);
  };

  const handleClickHome = () => {
    if (pathname === PATH.home) {
      return;
    } else {
      push(PATH.home);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isMobile]);

  useOnClickOutside(ref, toggleVisibility);

  if (!isVisible) {
    return (
      <div className={clsx(styles.floatingIcon)}>
        <IconButton
          onClick={toggleVisibility}
          outlined={false}
          icon={<MdMenu size={30} />}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.container, !isVisible && styles.notVisible)}
      ref={ref}
    >
      <div className={styles.sticky}>
        <div className={styles.buttonContainer}>
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
            icon={<MdHome size={size} onClick={handleClickHome} />}
            onClick={handleClickHome}
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
            title="Edit Profile"
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
      </div>
    </div>
  );
};

export default NavigationLayout;
