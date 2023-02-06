import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card from '../components/ui-kit/Card';
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
        <Card className={styles.signUp}>
          <h4>Login</h4>
          <AuthLogin />
        </Card>
      </main>
    </>
  );
};

export default Login;
