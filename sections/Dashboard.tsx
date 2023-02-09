import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { QueryCache } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MdExitToApp } from 'react-icons/md';
import DashboardLayout from '../components/layouts/dashboard';
import NavigationLayout from '../components/layouts/navigation';
import SidebarLayout from '../components/layouts/sidebar';
import TimelineLayout from '../components/layouts/timeline';
import Tweet from '../components/tweet';
import Button from '../components/ui-kit/Button';
import IconButton from '../components/ui-kit/IconButton';
import Spinner from '../components/ui-kit/Spinner';
import { useIsTablet } from '../hooks/mediaQuery';
import { useGetProfiles } from '../hooks/profiles';
import { useGetAllTweets } from '../hooks/tweet';
import useAlertStore from '../store';
import CreateTweet from './CreateTweet';

const Timeline = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  const { data: tweets, isLoading: tweetsLoading } = useGetAllTweets({});
  const { data: profiles, isLoading: profilesLoading } = useGetProfiles();
  const isTablet = useIsTablet();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      addAlert({
        message: error.message || 'Error signing out',
        type: 'error',
      });
    } else {
      const queryCache = new QueryCache();
      queryCache.clear();
      addAlert({
        message: 'Signed out',
        type: 'success',
      });
      router.push('/');
    }
  };

  return (
    <DashboardLayout>
      <NavigationLayout user={user} condensed={!isTablet}>
        {isTablet ? (
          <IconButton
            outlined={false}
            width={30}
            height={30}
            icon={<MdExitToApp size={30} onClick={handleSignOut} />}
          />
        ) : (
          <Button onClick={handleSignOut}>Sign out</Button>
        )}
      </NavigationLayout>

      <TimelineLayout>
        <CreateTweet />
        {profilesLoading || tweetsLoading ? (
          <Spinner type="dots" />
        ) : (
          tweets?.length &&
          tweets?.map((tweet) => {
            if (tweet.parent_id) return null;
            return <Tweet key={tweet.id} tweet={tweet} />;
          })
        )}
      </TimelineLayout>
      {!isTablet ? <SidebarLayout /> : null}
    </DashboardLayout>
  );
};

export default Timeline;
