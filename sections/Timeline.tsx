import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Button from '../components/ui-kit/Button';
import useAlertStore from '../store';

const Timeline = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { addAlert } = useAlertStore();

  const handleSignOut = async () => {
    try {
      await supabaseClient.auth.signOut();
    } catch (err) {
      addAlert({
        message: 'Error signing out',
        type: 'error',
      });
    } finally {
      addAlert({
        message: 'Signed out',
        type: 'success',
      });
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Timeline here</h1>
      <p>email: {user?.email}</p>
      <p>display name : {user?.user_metadata?.display_name}</p>
      <p>username : {user?.user_metadata?.username}</p>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default Timeline;
