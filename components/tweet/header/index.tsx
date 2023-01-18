import Image from 'next/image';
import { MdExpandMore, MdMoreHoriz } from 'react-icons/md';
import IconButton from '../../ui-kit/IconButton';
import styles from './styles.module.css';

type HeaderProps = {
  name?: string;
  displayName: string;
  date?: string;
  createMode: boolean;
};

const Header = ({
  name,
  date,
  displayName,
  createMode = false,
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
          </div>
          <div className={styles.menuContainer}>
            <IconButton icon={<MdMoreHoriz size={20} />} />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;