import { useUser } from '@supabase/auth-helpers-react';
import { profile } from 'console';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useGetFollowing, useToggleFollowMutation } from '../../hooks/profiles';
import IconButton from '../ui-kit/IconButton';
import styles from './styles.module.css';

type PeopleProps = {
  name: string;
  username: string;
  id?: string;
};

const People = ({ name, username, id }: PeopleProps) => {
  const { push, query } = useRouter();
  const user = useUser();
  const { data: followingList, isRefetching } = useGetFollowing(
    user?.id as string
  );
  const toggleFollowMutation = useToggleFollowMutation();

  const viewProfile = () => {
    if (!username) return null;
    if (query.username === username) return null;
    push({
      pathname: '/profile/[username]',
      query: { username: username },
    });
  };

  const handleFollow = async () => {
    try {
      toggleFollowMutation.mutate({
        userId: user?.id as string,
        tweetUserId: id as string,
        followingList: followingList,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} onClick={viewProfile}>
        <Image src="/success.png" alt="placeholder" width={40} height={40} />
      </div>

      <div className={styles.nameContainer} onClick={viewProfile}>
        <p>{name}</p>
        <p className={styles.username}>{username}</p>
      </div>
      <div className={styles.menuContainer}>
        <IconButton
          width={40}
          height={40}
          onClick={handleFollow}
          icon={<MdPersonAddAlt1 size={22} />}
        />
      </div>
    </div>
  );
};

export default People;
