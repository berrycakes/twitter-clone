import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdChevronRight } from 'react-icons/md';
import { getKeyByValue, startCase } from '../../helper/functions';
import { PATH } from '../../routes/paths';
import styles from './styles.module.css';

const Breadcrumbs = () => {
  const { pathname, push, query } = useRouter();
  const title = getKeyByValue(PATH, pathname);

  const handleClickHome = () => {
    if (pathname === PATH.home) {
      return null;
    } else {
      push(PATH.home);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.rootPath} onClick={handleClickHome}>
        Home
      </p>
      <div className={styles.iconContainer}>
        <MdChevronRight size={20} />
      </div>
      <p>
        {title === 'editProfile'
          ? 'Edit Profile'
          : title === 'profile'
          ? `${decodeURI(query.username as string)}'s Profile`
          : startCase(title)}
      </p>
    </div>
  );
};

export default Breadcrumbs;
