import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ControlledInputField from '../components/form/ControlledInputField';
import FormProvider from '../components/form/FormProvider';
import Alert from '../components/ui-kit/Alert';
import Button from '../components/ui-kit/Button';
import { PATH } from '../routes/paths';

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
  const user = useUser();
  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormFields) => {
    console.log(data);
    await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
      <ControlledInputField
        name="email"
        label="email"
        placeholder="email"
        type="text"
        rules={VALIDATIONS.email}
      />
      <ControlledInputField
        name="password"
        label="password"
        placeholder="password"
        type="password"
        rules={VALIDATIONS.password}
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        submit
      </Button>
      <Link href={PATH.signup}>Create an account</Link>
    </FormProvider>
  );
};

export default AuthLogin;