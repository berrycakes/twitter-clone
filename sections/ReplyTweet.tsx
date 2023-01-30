import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import { Tweet as TweetType } from '../components/tweet';
import Reply from '../components/tweet/reply';
import Button from '../components/ui-kit/Button';
import Stack from '../components/ui-kit/Stack';
import { useReadTweetReplies, useReplyTweetMutation } from '../hooks/tweet';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

type ReplyTweetProps = {
  tweet: TweetType;
  toggleReplyMode: VoidFunction;
};

const ReplyTweet = ({ tweet, toggleReplyMode }: ReplyTweetProps) => {
  const user = useUser();
  const { addAlert } = useAlertStore();
  const replies = useReadTweetReplies(tweet.id);
  const replyMutation = useReplyTweetMutation();
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
    if (!user) return null;
    const payload = {
      user_id: user.id,
      content: data.content,
      parent_id: tweet.id,
    };
    try {
      replyMutation.mutate(payload);
      reset();
    } catch (error: any) {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <>
      {replyForm ? (
        <Stack fullWidth>
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
              <Stack />
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
          <Button type="button" variant="primary" onClick={toggleReplyForm}>
            Reply
          </Button>
        </Stack>
      )}

      {replies?.length
        ? replies.map((reply) => {
            return <Reply key={reply.id} tweet={reply} />;
          })
        : null}
    </>
  );
};

export default ReplyTweet;
