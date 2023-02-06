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

type StatProps = {
  icon: ReactNode;
  stat?: number;
};

type FooterProps = {
  handleReply: () => void;
  replyStats: number;
};

const Stat = ({ icon, stat = 0 }: StatProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.iconContainer}>{icon}</div>
      <p>{stat}</p>
    </div>
  );
};

const Footer = ({ handleReply, replyStats }: FooterProps) => {
  return (
    <div className={styles.container}>
      <Stat icon={<MdBarChart size={20} />} />
      <Stat
        icon={
          <MdChatBubbleOutline
            size={20}
            onClick={handleReply}
            cursor="pointer"
          />
        }
        stat={replyStats}
      />
      <Stat icon={<MdRepeat size={20} />} />
      <Stat icon={<MdFavoriteBorder size={20} />} />
      <IconButton icon={<MdShare size={14} />} />
    </div>
  );
};

export default Footer;
