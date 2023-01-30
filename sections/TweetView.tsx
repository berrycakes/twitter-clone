import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { QueryCache } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layouts/dashboard';
import NavigationLayout from '../components/layouts/navigation';
import SidebarLayout from '../components/layouts/sidebar';
import TimelineLayout from '../components/layouts/timeline';
import People from '../components/people';
import Tweet from '../components/tweet';
import Button from '../components/ui-kit/Button';
import { useGetProfiles } from '../hooks/profiles';
import { useGetAllTweets, useReadTweet } from '../hooks/tweet';
import useAlertStore from '../store';

const TweetView = ({ id }: { id: number }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  useGetAllTweets({});
  const { data: profiles } = useGetProfiles();
  const tweet = useReadTweet(id);

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
      <NavigationLayout user={user}>
        <Button onClick={handleSignOut}>Sign out</Button>
      </NavigationLayout>
      <TimelineLayout>{tweet ? <Tweet tweet={tweet} /> : null}</TimelineLayout>
      <SidebarLayout>
        {profiles?.map((profile) => {
          if (!profile.display_name || !profile.username) return null;
          if (profile.username === user?.user_metadata?.username) return null;
          return (
            <People
              key={profile.id}
              name={profile.display_name}
              username={profile.username}
            />
          );
        })}
      </SidebarLayout>
    </DashboardLayout>
  );
};

export default TweetView;
