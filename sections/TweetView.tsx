import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { QueryCache } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdExitToApp } from 'react-icons/md';
import DashboardLayout from '../components/layouts/dashboard';
import NavigationLayout from '../components/layouts/navigation';
import SidebarLayout from '../components/layouts/sidebar';
import TimelineLayout from '../components/layouts/timeline';
import Tweet from '../components/tweet';
import Button from '../components/ui-kit/Button';
import IconButton from '../components/ui-kit/IconButton';
import Spinner from '../components/ui-kit/Spinner';
import Unavailable from '../components/unavailable';
import { useIsTablet } from '../hooks/mediaQuery';
import { useGetProfiles } from '../hooks/profiles';
import { useGetAllTweets, useReadTweet } from '../hooks/tweet';
import useAlertStore from '../store';

const TweetView = ({ id }: { id: number }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  useGetAllTweets({});
  const { data: profiles, isLoading } = useGetProfiles();
  const tweet = useReadTweet(id);
  const isTablet = useIsTablet();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      addAlert({
        message: error.message || 'Error signing out',
        type: 'error',
      });
      setLoading(false);
    } else {
      const queryCache = new QueryCache();
      queryCache.clear();
      addAlert({
        message: 'Signed out',
        type: 'success',
      });
      router.push('/');
      setLoading(false);
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
        {isLoading ? (
          <Spinner type="dots" />
        ) : tweet ? (
          <Tweet tweet={tweet} />
        ) : (
          <Unavailable />
        )}
      </TimelineLayout>
      {!isTablet ? <SidebarLayout /> : null}
    </DashboardLayout>
  );
};

export default TweetView;
