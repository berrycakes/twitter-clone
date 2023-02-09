import { ButtonHTMLAttributes } from 'react';
import {
  MdCalendarToday,
  MdEmojiEmotions,
  MdGif,
  MdInsertChart,
  MdInsertPhoto,
  MdLocationOn,
} from 'react-icons/md';
import { useIsMobile } from '../../../hooks/mediaQuery';
import Button from '../../ui-kit/Button';
import IconButton from '../../ui-kit/IconButton';
import styles from './styles.module.css';

type TweetButtonGroupProps = {
  tweetButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

const TweetButtonGroup = ({ tweetButtonProps }: TweetButtonGroupProps) => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.container}>
      {!isMobile ? (
        <>
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdInsertPhoto size={24} />}
          />
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdGif size={24} />}
          />
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdInsertChart size={24} />}
          />
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdEmojiEmotions size={24} />}
          />
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdCalendarToday size={24} />}
          />
          <IconButton
            type="button"
            width={40}
            height={40}
            icon={<MdLocationOn size={24} />}
          />{' '}
        </>
      ) : null}

      <div className={styles.buttonContainer}>
        <Button type="submit" fullWidth {...tweetButtonProps}>
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default TweetButtonGroup;
