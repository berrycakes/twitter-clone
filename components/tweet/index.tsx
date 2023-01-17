import dayjs from 'dayjs';
import Card from '../ui-kit/Card';
import Footer from './footer';
import Header from './header';
import styles from './styles.module.css';

type TweetProps = {
  content: string;
  username: string;
  date: Date;
};

const Tweet = (props: TweetProps) => {
  const { username, content, date } = props;
  return (
    <Card className={styles.container} padding="1.5rem">
      <Header name={username} date={dayjs(date).format('MMM D')} createMode={false} />
      <div className={styles.content}>{content}</div>
      <Footer />
    </Card>
  );
};

export default Tweet;

// Tweets
// -id: int
// -user_id: uuid
// -content: text
// -created_at: timestamp with time zone
// -parent_id: int
// Profiles
// -id: uuid
// -username: text
// -display_name: text
// -password: text
