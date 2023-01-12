import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
        <h1>Sign Up</h1>
        <div>
          <AuthSignUp />
        </div>
      </main>
    </>
  );
};

export default SignUp;
