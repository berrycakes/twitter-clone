import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PATH } from '../routes/paths';
import AuthLogin from '../sections/AuthLogin';
import styles from '../styles/Home.module.css';

const Login = () => {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push(PATH.home);
  }

  return (
    <>
      <Head>
        <title>Login| Twitter Clone</title>
      </Head>
      <main className={styles.main}>
        <h1>Login</h1>
        <div>
          <AuthLogin />
        </div>
      </main>
    </>
  );
};

export default Login;
