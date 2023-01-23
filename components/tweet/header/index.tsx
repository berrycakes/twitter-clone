import Image from 'next/image';
import { MdDelete, MdEdit, MdExpandMore, MdMoreHoriz } from 'react-icons/md';
import Dropdown, { DropdownItem } from '../../dropdown';
import IconButton from '../../ui-kit/IconButton';
import styles from './styles.module.css';

type HeaderProps = {
  name?: string;
  displayName: string;
  date?: string;
  isEdited?: boolean;
  createMode: boolean;
  dropdownItems?: DropdownItem[];
};

const Header = ({
  name,
  date,
  displayName,
  createMode = false,
  dropdownItems,
  isEdited,
}: HeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/success.png" alt="placeholder" width={40} height={40} />
      </div>
      <div className={styles.nameContainer}>{displayName}</div>
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
            <div>{name}</div>
            <p>•</p>
            <div>{date}</div>
            {isEdited ? <div className={styles.edited}>edited</div> : null}
          </div>
          <div className={styles.menuContainer}>
            <Dropdown items={dropdownItems} icon={<MdMoreHoriz />} />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
