import { useUser } from '@supabase/auth-helpers-react';
import { useForm } from 'react-hook-form';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import Header from '../components/tweet/header';
import TweetButtonGroup from '../components/tweet/tweet-button-group';
import Card from '../components/ui-kit/Card';
import { useCreateTweetMutation } from '../hooks/tweet';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

const CreateTweet = () => {
  const user = useUser();
  const createMutation = useCreateTweetMutation();
  const { addAlert } = useAlertStore();
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

  const onSubmit = async (data: FormFields) => {
    if (!user) return null;
    const payload = {
      content: data.content,
      user_id: user.id,
    };
    try {
      createMutation.mutate(payload);
      reset();
    } catch (error: any) {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Card padding="1.5rem" fullWidth>
      <Header displayName={user?.user_metadata?.display_name} createMode />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextArea
          type="create"
          name="content"
          placeholder="What's happening?"
          rules={{
            required: { value: true, message: 'Content is required' },
            maxLength: { value: 225, message: 'Exceeded maximum length' },
          }}
        />
        <TweetButtonGroup
          tweetButtonProps={{
            disabled: !isValid || !watch('content') || isSubmitting,
          }}
        />
      </FormProvider>
    </Card>
  );
};

export default CreateTweet;
