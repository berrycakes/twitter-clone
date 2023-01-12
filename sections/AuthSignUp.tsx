import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ControlledInputField from '../components/form/ControlledInputField';
import FormProvider from '../components/form/FormProvider';
import Button from '../components/ui-kit/Button';
import { hasLowerCase, hasSpecialChar, hasUpperCase } from '../helper/pattern';
import { PATH } from '../routes/paths';
import useAlertStore from '../store';

type FormFields = {
  email: string;
  displayName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const AuthSignUp = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { addAlert } = useAlertStore();
  const methods = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      displayName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const VALIDATIONS = {
    email: {
      required: { value: true, message: 'This field is required' },
    },
    displayName: {
      required: { value: true, message: 'This field is required' },
    },
    username: {
      required: { value: true, message: 'This field is required' },
      minLength: { value: 3, message: 'Minimum of 3 characters' },
    },
    password: {
      required: { value: true, message: 'This field is required' },
      minLength: { value: 8, message: 'Minimum of 8 characters' },
      validate: (val: string) => {
        if (!hasUpperCase(val)) {
          return 'Must have at least 1 uppercase character';
        }
        if (!hasLowerCase(val)) {
          return 'Must have at least 1 lowercase character';
        }
        if (!hasSpecialChar(val)) {
          return 'Must have at least 1 special character';
        }
      },
    },
    confirmPassword: {
      required: { value: true, message: 'This field is required' },
      validate: (val: string) => {
        if (watch('password') != val) {
          return 'Your passwords do not match';
        }
      },
    },
  };

  const onSubmit = async (data: FormFields) => {
    const { data: response, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          display_name: data.displayName,
        },
      },
    });
    if (!!error) {
      console.log('network', error);
    } else {
      addAlert({
        message: 'Account created. Confirm your email address.',
        type: 'success',
      });
      router.push(PATH.login);
    }
  };

  const onError = (error: any) => {
    console.log('form', error);
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
        name="displayName"
        label="displayName"
        placeholder="displayName"
        type="text"
        rules={VALIDATIONS.displayName}
      />
      <ControlledInputField
        name="username"
        label="username"
        placeholder="username"
        type="text"
        rules={VALIDATIONS.username}
      />
      <ControlledInputField
        name="password"
        label="password"
        placeholder="password"
        type="text"
        rules={VALIDATIONS.password}
      />
      <ControlledInputField
        name="confirmPassword"
        label="confirm"
        placeholder="confirm"
        type="text"
        rules={VALIDATIONS.confirmPassword}
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        submit
      </Button>
      <Link href={PATH.login}>Login instead</Link>
    </FormProvider>
  );
};

export default AuthSignUp;
