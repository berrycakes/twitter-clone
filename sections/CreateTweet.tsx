import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import Header from '../components/tweet/header';
import TweetButtonGroup from '../components/tweet/tweet-button-group';
import Button from '../components/ui-kit/Button';
import Card from '../components/ui-kit/Card';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

const CreateTweet = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { addAlert } = useAlertStore();
  const qc = useQueryClient();
  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormFields) => {
    const payload = {
      content: data.content,
      user_id: user?.id,
    };
    const { data: res, error } = await supabaseClient.from('tweets').insert(payload).select();
    if (res) {
      reset();
      qc.invalidateQueries(['tweets']);
    }
    if (error) {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Card padding="1.5rem">
      <Header name={user?.user_metadata?.display_name} createMode />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextArea
          type="create"
          name="content"
          placeholder="What's happening?"
          rules={{
            maxLength: { value: 225, message: 'Exceeded maximum length' },
          }}
        />
        <TweetButtonGroup />
      </FormProvider>
    </Card>
  );
};

export default CreateTweet;
