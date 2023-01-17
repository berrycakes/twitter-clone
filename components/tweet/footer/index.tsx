import { ReactNode } from 'react';
import {
  MdBarChart,
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdRepeat,
  MdShare,
} from 'react-icons/md';
import IconButton from '../../ui-kit/IconButton';
import styles from './styles.module.css';

const Stat = ({ icon }: { icon: ReactNode }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.iconContainer}>{icon}</div>
      <p>0</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.container}>
      <Stat icon={<MdBarChart size={20} />} />
      <Stat icon={<MdChatBubbleOutline size={20} />} />
      <Stat icon={<MdRepeat size={20} />} />
      <Stat icon={<MdFavoriteBorder size={20} />} />
      <IconButton icon={<MdShare size={14} />} />
    </div>
  );
};

export default Footer;
