import { useUser } from '@supabase/auth-helpers-react';
import { ReactNode, useEffect } from 'react';
import { useGetFollowing, useGetProfiles } from '../../../hooks/profiles';
import People from '../../people';
import Card from '../../ui-kit/Card';
import Spinner from '../../ui-kit/Spinner';
import styles from './styles.module.css';

const SidebarLayout = () => {
  const user = useUser();
  const { data: profiles, isLoading: profilesLoading } = useGetProfiles();
  const { data: followingList, isRefetching } = useGetFollowing(
    user?.id as string
  );

  return (
    <div className={styles.container}>
      <Card padding="1rem" className={styles.card}>
        <h6>Who to follow</h6>
        {profilesLoading ? (
          <Spinner type="dots" />
        ) : (
          profiles?.length &&
          profiles?.map((profile) => {
            if (!profile.display_name || !profile.username) return null;
            if (profile.username === user?.user_metadata?.username) return null;
            if (profile.id && followingList?.includes(profile.id)) return null;
            return (
              <People
                key={profile.id}
                id={profile.id}
                name={profile.display_name}
                username={profile.username}
              />
            );
          })
        )}
      </Card>
    </div>
  );
};

export default SidebarLayout;
