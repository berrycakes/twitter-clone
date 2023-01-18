import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import Card from '../ui-kit/Card';
import Footer from './footer';
import Header from './header';
import styles from './styles.module.css';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: 'MMM DD',
    y: 'MMM DD YY',
  },
});

type TweetProps = {
  content: string;
  username: string;
  displayName: string;
  date: Date;
};

const Tweet = (props: TweetProps) => {
  const { username, displayName, content, date } = props;
  const displayDate =
    dayjs(new Date()).diff(date, 'hours') < 23
      ? dayjs(date).fromNow(true)
      : dayjs(date).year() === dayjs().year()
      ? dayjs(date).format('MMM DD')
      : dayjs(date).format('MMM DD YY');
  return (
    <Card className={styles.container} padding="1.5rem">
      <Header
        name={username}
        displayName={displayName}
        date={displayDate}
        createMode={false}
      />
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
