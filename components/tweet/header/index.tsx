import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { useIsMobile } from '../../../hooks/mediaQuery';
import { Profile } from '../../../hooks/profiles';
import Dropdown, { DropdownItem } from '../../dropdown';
import styles from './styles.module.css';

type HeaderProps = {
  profile?: Profile;
  date?: string;
  displayName?: string;
  isEdited?: boolean;
  createMode: boolean;
  dropdownItems?: DropdownItem[];
  dropdownIcon?: ReactNode;
};

const Header = ({
  date,
  createMode = false,
  dropdownItems,
  dropdownIcon,
  isEdited,
  profile,
  displayName,
}: HeaderProps) => {
  const { push, query } = useRouter();

  const viewProfile = () => {
    if (!profile?.username) return null;
    if (query.username === profile?.username) return null;
    push({
      pathname: '/profile/[username]',
      query: { username: profile.username },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} onClick={viewProfile}>
        <Image src="/success.png" alt="placeholder" width={40} height={40} />
      </div>
      <div className={styles.nameContainer} onClick={viewProfile}>
        {displayName || profile?.display_name || 'Anonymous'}
      </div>
      {createMode ? (
        <div className={styles.dropdownContainer}>
          <p>Everyone</p>
          <div className={styles.dropdownIcon}>
            <MdExpandMore size={20} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.dateContainer}>
            <div className={styles.nameContainer} onClick={viewProfile}>
              {profile?.username || 'unknownUser'}
            </div>
            <p>•</p>
            <div>{date}</div>
            {isEdited ? <div className={styles.edited}>edited</div> : null}
          </div>
          <div className={styles.menuContainer}>
            <Dropdown items={dropdownItems} icon={dropdownIcon} />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
