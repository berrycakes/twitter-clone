import { useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdDelete, MdEdit, MdMoreHoriz, MdPersonAddAlt1 } from 'react-icons/md';
import { useReadTweetProfile } from '../../hooks/profiles';
import {
  useDeleteTweetMutation,
  useReadTweet,
  useReadTweetReplies,
} from '../../hooks/tweet';
import { PATH } from '../../routes/paths';
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
  tweet: Tweet;
};

const Tweet = ({ tweet }: TweetProps) => {
  const { pathname, push, query } = useRouter();
  const isTweetView = pathname !== PATH.dashboard;
  const isProfileView = pathname === PATH.profile;

  const { created_at, updated_at, content, user_id, id, parent_id } = tweet;

  const profile = useReadTweetProfile(user_id as string);
  const parentTweet = useReadTweet(parent_id);
  const parentProfile = useReadTweetProfile(parentTweet?.user_id as string);
  const replies = useReadTweetReplies(id);

  const deleteMutation = useDeleteTweetMutation(id);

  const user = useUser();
  const { addAlert } = useAlertStore();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [replyMode, setReplyMode] = useState(isTweetView);

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
    if (parseInt(query?.id as string) === id) {
      toggleReplyMode();
    } else {
      push({
        pathname: '/tweet/[id]',
        query: { id: id },
      });
    }
  };

  const viewParent = () => {
    push({
      pathname: '/tweet/[id]',
      query: { id: parent_id },
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
    try {
      deleteMutation.mutate();
    } catch (error) {
      addAlert({
        message: 'Error deleting tweet',
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
        profile={profile}
        date={displayDate()}
        isEdited={isEdited}
        createMode={false}
        dropdownItems={user_id === user?.id ? selfMenuItems : otherMenuItems}
        dropdownIcon={
          user_id === user?.id ? <MdMoreHoriz /> : <MdPersonAddAlt1 />
        }
      />
      {isTweetView && parent_id ? (
        <p className={styles.replying} onClick={() => viewParent()}>
          {`Replying to @${parentProfile?.username}`}
        </p>
      ) : null}
      {editMode ? (
        <EditTweet tweet={tweet} toggleEditMode={toggleEditMode} />
      ) : (
        <div className={styles.content}>{content}</div>
      )}
      <Footer handleReply={handleReply} replyStats={replies?.length || 0} />
      {replyMode && !isProfileView ? (
        <ReplyTweet tweet={tweet} toggleReplyMode={toggleReplyMode} />
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
