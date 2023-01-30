import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type GetTweetOptionsType = {
  orderBy?: string;
  ascending?: boolean;
};

type Tweet = {
  id: number;
  user_id: string;
  content: string;
  created_at: string | Date;
  updated_at: string | Date;
  parent_id?: number;
};

const TWEETS_CACHE_KEY = 'tweets';
const TWEET_CACHE_KEY = 'tweet';
const TWEET_REPLIES_CACHE_KEY = 'tweetReplies';

export const useGetAllTweets = ({
  orderBy = 'updated_at',
  ascending = false,
}: GetTweetOptionsType) => {
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .select()
      .order(orderBy, { ascending: ascending });
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useQuery<Tweet[]>([TWEETS_CACHE_KEY], queryFn);
};

export const useReadAllTweets = () => {
  const qc = useQueryClient();
  return qc.getQueryData<Tweet[]>([TWEETS_CACHE_KEY]);
};

export const useReadTweet = (id?: number) => {
  if (!id) return null;
  const tweets = useReadAllTweets();
  return tweets?.find((tweet) => tweet.id === id);
};

export const useReadTweetReplies = (id: number) => {
  if (!id) return null;
  const tweets = useReadAllTweets();
  return tweets?.filter((item) => id === item.parent_id);
};

export const useDeleteTweetMutation = (id: number) => {
  const supabaseClient = useSupabaseClient();
  const qc = useQueryClient();

  const queryFn = async () => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .delete()
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useMutation(queryFn, {
    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: [TWEETS_CACHE_KEY],
      });
    },
  });
};

export const useReplyTweetMutation = () => {
  const supabaseClient = useSupabaseClient();
  const qc = useQueryClient();
  const queryFn = async (payload: {
    user_id: string;
    content: string;
    parent_id: number;
  }): Promise<Tweet[]> => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .insert(payload)
      .select();
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useMutation(queryFn, {
    onSuccess: (data: Tweet[]) => {
      qc.invalidateQueries({
        queryKey: [TWEETS_CACHE_KEY],
      });
    },
  });
};

export const useCreateTweetMutation = () => {
  const supabaseClient = useSupabaseClient();
  const qc = useQueryClient();
  const queryFn = async (payload: {
    user_id: string;
    content: string;
  }): Promise<Tweet[]> => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .insert(payload)
      .select();
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useMutation(queryFn, {
    onSuccess: (data: Tweet[]) => {
      qc.invalidateQueries({
        queryKey: [TWEETS_CACHE_KEY],
      });
    },
  });
};

export const useEditTweetMutation = () => {
  const supabaseClient = useSupabaseClient();
  const qc = useQueryClient();
  const queryFn = async (payload: {
    id: number;
    updated_at: string | Date;
    content: string;
  }) => {
    const { data, error } = await supabaseClient
      .from('tweets')
      .update({
        content: payload.content,
        updated_at: payload.updated_at,
      })
      .eq('id', payload.id);
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useMutation(queryFn, {
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [TWEETS_CACHE_KEY],
      });
    },
  });
};
