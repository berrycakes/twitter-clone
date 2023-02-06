import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';
import ControlledTextArea from '../components/form/ControlledTextArea';
import FormProvider from '../components/form/FormProvider';
import { Tweet } from '../components/tweet';
import Button from '../components/ui-kit/Button';
import Stack from '../components/ui-kit/Stack';
import { useEditTweetMutation } from '../hooks/tweet';
import useAlertStore from '../store';

type FormFields = {
  content: string;
};

type EditTweetProps = {
  tweet: Tweet;
  toggleEditMode: VoidFunction;
};

const EditTweet = ({ tweet, toggleEditMode }: EditTweetProps) => {
  const editMutation = useEditTweetMutation();
  const { addAlert } = useAlertStore();
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
      content: data.content,
      updated_at: new Date(),
      id: tweet.id,
    };
    try {
      editMutation.mutate(payload);
      toggleEditMode();
      reset();
    } catch (error: any) {
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
  };

  const ref = useRef(null);
  useOnClickOutside(ref, toggleEditMode);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div ref={ref}>
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
            fullWidth
            disabled={
              !isValid || watch('content') === tweet.content || isSubmitting
            }
          >
            Update
          </Button>
          <Button
            type="button"
            variant="error"
            fullWidth
            onClick={toggleEditMode}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </FormProvider>
  );
};

export default EditTweet;
