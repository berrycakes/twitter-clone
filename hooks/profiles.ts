import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type Profile = {
  avatar_url?: string;
  display_name?: string;
  email?: string;
  full_name?: string;
  id?: string;
  updated_at?: string | Date;
  username?: string;
};

const PROFILES_CACHE_KEY = 'profiles';
const TWEET_PROFILE_CACHE_KEY = 'tweetProfile';

export const useGetProfiles = () => {
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    const { data, error } = await supabaseClient.from('profiles').select();
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useQuery<Profile[]>([PROFILES_CACHE_KEY], queryFn);
};

export const useReadAllProfiles = () => {
  const qc = useQueryClient();
  return qc.getQueryData<Profile[]>([PROFILES_CACHE_KEY]);
};

export const useReadTweetProfile = (userId: string) => {
  const profiles = useReadAllProfiles();
  const profile: Profile | undefined = profiles?.find(
    (profile) => profile.id === userId
  );
  return profile as Profile;
};
export const useReadIdFromUsername = (username: string) => {
  if (!username) return null;
  const profiles = useReadAllProfiles();
  const profile: Profile | undefined = profiles?.find(
    (profile) => profile.username === username
  );
  return profile?.id;
};

export const useGetTweetProfile = (userId: string) => {
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select()
      .eq('id', userId);
    if (error) {
      throw new Error(error.message);
    } else {
      return data?.[0];
    }
  };

  return useQuery<Profile>([TWEET_PROFILE_CACHE_KEY, userId], queryFn);
};
