import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import { Tweet } from '../components/tweet';
import Header from '../components/tweet/header';
import TweetButtonGroup from '../components/tweet/tweet-button-group';
import Button from '../components/ui-kit/Button';
import Card from '../components/ui-kit/Card';
import Stack from '../components/ui-kit/Stack';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

type ReplyTweetProps = {
  tweet: Tweet;
  toggleReplyMode: VoidFunction;
};

const ReplyTweet = ({ tweet, toggleReplyMode }: ReplyTweetProps) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { addAlert } = useAlertStore();
  const qc = useQueryClient();
  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      content: tweet.content,
    },
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

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
      toggleReplyMode();
      reset();
      qc.invalidateQueries(['tweets']);
    } else {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  const ref = useRef(null);
  useOnClickOutside(ref, toggleReplyMode);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div ref={ref}>
        <Stack divider margin="1rem 0" />
        <ControlledTextArea
          type="create"
          name="content"
          defaultValue={tweet.content}
          rules={{
            required: { value: true, message: 'Content is required' },
            maxLength: { value: 225, message: 'Exceeded maximum length' },
          }}
        />
        <Stack row gap={16} padding={16}>
          <Button
            type="submit"
            disabled={
              !isValid || watch('content') === tweet.content || isSubmitting
            }
          >
            Submit
          </Button>
          <Button type="button" variant="error" onClick={toggleReplyMode}>
            Cancel
          </Button>
        </Stack>
      </div>
    </FormProvider>
  );
};

export default ReplyTweet;
