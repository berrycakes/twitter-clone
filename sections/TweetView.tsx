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
import useAlertStore from '../store';
import CreateTweet from './CreateTweet';

const TweetView = (props: { id: number }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  const getTweets = async () => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .select()
      .order('updated_at', { ascending: false });
    return data;
  };

  const getSpecificTweet = async () => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .select()
      .eq('id', props.id);
    return data?.[0];
  };

  const getProfiles = async () => {
    const { data, error } = await supabaseClient.from('profiles').select();
    return data;
  };

  const { data: tweets } = useQuery({
    queryKey: ['tweets'],
    queryFn: getTweets,
  });
  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });
  const { data: specificTweet } = useQuery({
    queryKey: ['specific'],
    queryFn: getSpecificTweet,
  });

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
  if (specificTweet?.parent_id) return null;

  const renderTweet = () => {
    const profile = profiles.find(
      (profile) => specificTweet?.user_id === profile.id
    );
    const replies = tweets.filter(
      (item) => specificTweet?.id === item.parent_id
    );
    if (!profile) return null;
    return (
      <Tweet
        username={profile.username || 'unknown user'}
        displayName={profile.display_name || ''}
        tweet={specificTweet}
        replies={replies}
      />
    );
  };

  return (
    <DashboardLayout>
      <NavigationLayout user={user}>
        <Button onClick={handleSignOut}>Sign out</Button>
      </NavigationLayout>
      <TimelineLayout>{renderTweet()}</TimelineLayout>
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

export default TweetView;
