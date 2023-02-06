import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdPersonAddAlt1 } from 'react-icons/md';
import IconButton from '../ui-kit/IconButton';
import styles from './styles.module.css';

type HeaderProps = {
  name: string;
  username: string;
};

const People = ({ name, username }: HeaderProps) => {
  const { push } = useRouter();

  const viewProfile = () => {
    if (!username) return null;
    push({
      pathname: '/profile/[username]',
      query: { username: username },
    });
  };

  return (
    <div className={styles.container} onClick={viewProfile}>
      <div className={styles.imageContainer}>
        <Image src="/success.png" alt="placeholder" width={40} height={40} />
      </div>

      <div className={styles.nameContainer}>
        <p>{name}</p>
        <p className={styles.username}>{username}</p>
      </div>
      <div className={styles.menuContainer}>
        <IconButton
          width={40}
          height={40}
          icon={<MdPersonAddAlt1 size={22} />}
        />
      </div>
    </div>
  );
};

export default People;
