import {
  MdCalendarToday,
  MdEmojiEmotions,
  MdGif,
  MdInsertChart,
  MdInsertPhoto,
  MdLocationOn,
} from 'react-icons/md';
import Button from '../../ui-kit/Button';
import IconButton from '../../ui-kit/IconButton';
import styles from './styles.module.css';

const TweetButtonGroup = () => {
  return (
    <div className={styles.container}>
      <IconButton type="button" width={40} height={40} icon={<MdInsertPhoto size={24} />} />
      <IconButton type="button" width={40} height={40} icon={<MdGif size={24} />} />
      <IconButton type="button" width={40} height={40} icon={<MdInsertChart size={24} />} />
      <IconButton type="button" width={40} height={40} icon={<MdEmojiEmotions size={24} />} />
      <IconButton type="button" width={40} height={40} icon={<MdCalendarToday size={24} />} />
      <IconButton type="button" width={40} height={40} icon={<MdLocationOn size={24} />} />
      <div className={styles.buttonContainer}>
        <Button type="submit" fullWidth>
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default TweetButtonGroup;
