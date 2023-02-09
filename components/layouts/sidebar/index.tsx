import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useGetFollowing, useGetProfiles } from '../../../hooks/profiles';
import People from '../../people';
import Button from '../../ui-kit/Button';
import Card from '../../ui-kit/Card';
import Spinner from '../../ui-kit/Spinner';
import styles from './styles.module.css';

const SidebarLayout = () => {
  const user = useUser();
  const [range, setRange] = useState([0, 5]);
  const { data: profiles, isLoading: profilesLoading } = useGetProfiles();
  const { data: followingList, isRefetching } = useGetFollowing(
    user?.id as string
  );

  const profileList = profiles
    ?.filter((profile) => profile.display_name && profile.username)
    .filter((profile) => profile.username !== user?.user_metadata?.username)
    .filter((profile) => !followingList?.includes(profile?.id as string));

  const handleLoadMore = () => {
    if (!profileList) return null;
    if (range[1] > profileList.length) {
      setRange([0, 5]);
    } else {
      setRange([range[0] + 5, range[1] + 5]);
    }
  };

  return (
    <div className={styles.container}>
      <Card padding="1rem" className={styles.card}>
        <h6>Who to follow</h6>
        <div className={styles.peopleGrid}>
          {profilesLoading ? (
            <Spinner type="dots" />
          ) : (
            profileList?.length &&
            profileList.slice(range[0], range[1]).map((profile) => {
              return (
                <People
                  key={profile.id}
                  id={profile.id}
                  name={profile.display_name as string}
                  username={profile.username as string}
                />
              );
            })
          )}
        </div>
        <div className={styles.loadMore} onClick={handleLoadMore}>
          <p>Load More</p>
        </div>
      </Card>
    </div>
  );
};

export default SidebarLayout;
