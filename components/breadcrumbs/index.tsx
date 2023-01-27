import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdChevronRight } from 'react-icons/md';
import { getKeyByValue, startCase } from '../../helper/functions';
import { PATH } from '../../routes/paths';
import styles from './styles.module.css';

const Breadcrumbs = () => {
  const { pathname } = useRouter();
  const title = getKeyByValue(PATH, pathname);

  return (
    <div className={styles.container}>
      <Link href="/">
        <p className={styles.rootPath}>Home</p>
      </Link>
      <div className={styles.iconContainer}>
        <MdChevronRight size={20} />
      </div>
      <p>{startCase(title)}</p>
    </div>
  );
};

export default Breadcrumbs;
