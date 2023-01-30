import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { QueryCache, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layouts/dashboard';
import NavigationLayout from '../components/layouts/navigation';
import SidebarLayout from '../components/layouts/sidebar';
import TimelineLayout from '../components/layouts/timeline';
import People from '../components/people';
import Tweet from '../components/tweet';
import Button from '../components/ui-kit/Button';
import { useGetAllTweets } from '../hooks/tweet';
import { useGetProfiles } from '../hooks/profiles';
import useAlertStore from '../store';
import CreateTweet from './CreateTweet';

const Timeline = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  const { data: tweets } = useGetAllTweets({});
  const { data: profiles } = useGetProfiles();

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

  if (!profiles || !tweets) return null;

  return (
    <DashboardLayout>
      <NavigationLayout user={user}>
        <Button onClick={handleSignOut}>Sign out</Button>
      </NavigationLayout>
      <TimelineLayout>
        <CreateTweet />
        {tweets.map((tweet) => {
          if (tweet.parent_id) return null;
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </TimelineLayout>
      <SidebarLayout>
        {profiles.map((profile) => {
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

export default Timeline;
