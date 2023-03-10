import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../components/ui-kit/Card';
import { PATH } from '../routes/paths';
import AuthSignUp from '../sections/AuthSignUp';
import styles from '../styles/Home.module.css';

const SignUp = () => {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push(PATH.home);
  }

  return (
    <>
      <Head>
        <title>Sign Up | Twitter Clone</title>
      </Head>
      <main className={styles.main}>
        <Card className={styles.signUp}>
          <h4>Create an account</h4>
          <AuthSignUp />
        </Card>
      </main>
    </>
  );
};

export default SignUp;
