import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm } from 'react-hook-form';
import ControlledInputField from '../components/form/ControlledInputField';
import FormProvider from '../components/form/FormProvider';
import Button from '../components/ui-kit/Button';
import ButtonContainer from '../components/ui-kit/ButtonContainer';
import Link from '../components/ui-kit/Link';
import { PATH } from '../routes/paths';
import useAlertStore from '../store';

type FormFields = {
  email: string;
  password: string;
};

const VALIDATIONS = {
  email: {
    required: { value: true, message: 'This field is required' },
    minLength: { value: 3, message: 'Minimum of 3 characters' },
  },
  password: {
    required: { value: true, message: 'This field is required' },
    minLength: { value: 8, message: 'Minimum of 8 characters' },
  },
};

const AuthLogin = () => {
  const supabaseClient = useSupabaseClient();
  const { addAlert } = useAlertStore();
  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const checkEmails = async () => {
    const { data, error } = await supabaseClient.from('profiles').select();
    console.log({ data });
  };
  checkEmails();

  const onSubmit = async (data: FormFields) => {
    const { data: res, error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setError('email', { type: 'custom', message: error.message });
      setError('password', { type: 'custom', message: error.message });
      addAlert({
        message: error.message,
        type: 'error',
      });
    }
    if (res.user) {
      addAlert({
        message: `Logged in as ${res.user.user_metadata.display_name}`,
        type: 'success',
      });
    }
  };

  const onError = () => {
    addAlert({ message: 'Form error', type: 'error' });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
      <ControlledInputField
        name="email"
        label="Email"
        placeholder="email"
        type="text"
        rules={VALIDATIONS.email}
      />
      <ControlledInputField
        name="password"
        label="Password"
        placeholder="password"
        type="password"
        rules={VALIDATIONS.password}
      />
      <ButtonContainer>
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Next
        </Button>
        <Link href={'/'}>Forgot Password</Link>
      </ButtonContainer>
      <ButtonContainer>
        <p>
          Don't have an account?{' '}
          <Link href={PATH.signup} variant="accent">
            Sign Up here
          </Link>
        </p>
      </ButtonContainer>
    </FormProvider>
  );
};

export default AuthLogin;
