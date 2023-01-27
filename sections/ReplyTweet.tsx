import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import Tweet, { Tweet as TweetType } from '../components/tweet';
import Header from '../components/tweet/header';
import Reply from '../components/tweet/reply';
import TweetButtonGroup from '../components/tweet/tweet-button-group';
import Button from '../components/ui-kit/Button';
import Card from '../components/ui-kit/Card';
import Stack from '../components/ui-kit/Stack';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

type ReplyTweetProps = {
  tweet: TweetType;
  replies?: TweetType[];
  toggleReplyMode: VoidFunction;
};

const ReplyTweet = ({ tweet, toggleReplyMode, replies }: ReplyTweetProps) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { addAlert } = useAlertStore();
  const qc = useQueryClient();
  const [replyForm, setReplyForm] = useState(true);

  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const toggleReplyForm = () => {
    setReplyForm(!replyForm);
  };

  const onSubmit = async (data: FormFields) => {
    const payload = {
      user_id: user?.id,
      content: data.content,
      parent_id: tweet.id,
    };
    const { error } = await supabaseClient
      .from('tweets')
      .insert(payload)
      .select();
    if (!error) {
      reset();
      qc.invalidateQueries(['tweets']);
    } else {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  const profiles = qc.getQueryData<any[]>(['profiles']);
  const tweets = qc.getQueryData<TweetType[]>(['tweets']);

  const ref = useRef(null);
  useOnClickOutside(ref, toggleReplyForm);

  return (
    <>
      {replyForm ? (
        <Stack fullWidth ref={ref}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack divider margin="1rem 0 0 0" />
            <ControlledTextArea
              type="create"
              name="content"
              rules={{
                required: { value: true, message: 'Content is required' },
                maxLength: { value: 225, message: 'Exceeded maximum length' },
              }}
            />
            <Stack row gap={16} padding={16}>
              <Button
                type="submit"
                disabled={!isValid || !watch('content') || isSubmitting}
              >
                Reply
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
      ) : (
        <Stack row padding="1rem 0">
          <Stack margin="0 4rem" />
          <Button type="button" variant="primary" onClick={toggleReplyForm}>
            Reply
          </Button>
        </Stack>
      )}

      {replies?.length
        ? replies.map((reply) => {
            const profile = profiles?.find(
              (profile) => reply.user_id === profile.id
            );
            const nestedReplies = tweets?.filter(
              (tweet) => reply.id === tweet.parent_id
            );
            return (
              <>
                <Reply
                  key={reply.id}
                  tweet={reply}
                  username={profile.username || 'unknown user'}
                  displayName={profile.display_name || ''}
                  replies={nestedReplies}
                />
              </>
            );
          })
        : null}
    </>
  );
};

export default ReplyTweet;
