import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdDelete, MdEdit, MdMoreHoriz, MdPersonAddAlt1 } from 'react-icons/md';
import { PATH } from '../../routes/paths';
import CreateTweet from '../../sections/CreateTweet';
import EditTweet from '../../sections/EditTweet';
import ReplyTweet from '../../sections/ReplyTweet';
import useAlertStore from '../../store';
import Card from '../ui-kit/Card';
import Modal from '../ui-kit/Modal';
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

export type Tweet = {
  id: number;
  user_id: string;
  content: string;
  created_at: string | Date;
  updated_at: string | Date;
  parent_id?: number;
};

type TweetProps = {
  username: string;
  displayName: string;
  tweet: Tweet;
  replies?: Tweet[];
};

const Tweet = (props: TweetProps) => {
  const { pathname } = useRouter();
  const isTweetView = pathname === PATH.tweet;

  const user = useUser();
  const qc = useQueryClient();
  const { addAlert } = useAlertStore();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [replyMode, setReplyMode] = useState(isTweetView);

  const { username, displayName, tweet, replies } = props;
  const { created_at, updated_at, content, id, user_id, parent_id } = tweet;
  const isEdited = created_at !== updated_at;

  const displayDate = () => {
    const date = isEdited ? updated_at : created_at;
    return dayjs(new Date()).diff(date, 'hours') < 23
      ? dayjs(date).fromNow(true)
      : dayjs(date).year() === dayjs().year()
      ? dayjs(date).format('MMM DD')
      : dayjs(date).format('MMM DD YY');
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const toggleReplyMode = () => {
    setReplyMode(!replyMode);
  };

  const viewReply = (id: number) => {
    router.push({
      pathname: '/tweet/[id]',
      query: { id: id },
    });
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleReply = () => {
    viewReply(tweet.id);
  };

  const handleDelete = async () => {
    if (user?.id !== tweet.user_id) return null;
    const { error } = await supabaseClient
      .from('tweets')
      .delete()
      .eq('id', tweet.id);
    if (!error) {
      qc.invalidateQueries(['tweets']);
    } else {
      addAlert({
        message: error.message || 'Error deleting tweet',
        type: 'error',
      });
    }
  };

  const selfMenuItems = [
    {
      label: 'Edit',
      icon: <MdEdit />,
      onClick: () => {
        toggleEditMode();
      },
    },
    {
      label: 'Delete',
      icon: <MdDelete />,
      onClick: () => {
        toggleDeleteMode();
      },
      customHover: true,
    },
  ];

  const otherMenuItems = [
    {
      label: 'Follow',
      icon: <MdPersonAddAlt1 />,
      onClick: () => {
        toggleDeleteMode();
      },
    },
  ];

  return (
    <Card className={styles.container} padding="1.5rem">
      <Header
        name={username}
        displayName={displayName}
        date={displayDate()}
        isEdited={isEdited}
        createMode={false}
        dropdownItems={user_id === user?.id ? selfMenuItems : otherMenuItems}
        dropdownIcon={
          user_id === user?.id ? <MdMoreHoriz /> : <MdPersonAddAlt1 />
        }
      />
      {editMode ? (
        <EditTweet tweet={tweet} toggleEditMode={toggleEditMode} />
      ) : (
        <div className={styles.content}>{content}</div>
      )}
      <Footer handleReply={handleReply} replyStats={replies?.length || 0} />
      {replyMode ? (
        <ReplyTweet
          tweet={tweet}
          toggleReplyMode={toggleReplyMode}
          replies={replies}
        />
      ) : null}

      <Modal
        actionLabel="Delete"
        header="Confirm"
        content="Are you sure you want to delete this tweet?"
        action={handleDelete}
        isOpen={deleteMode}
        setIsOpen={setDeleteMode}
      />
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
