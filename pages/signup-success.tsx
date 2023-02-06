import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../components/ui-kit/Button';
import ButtonContainer from '../components/ui-kit/ButtonContainer';
import Card from '../components/ui-kit/Card';
import Link from '../components/ui-kit/Link';
import { PATH } from '../routes/paths';
import AuthLogin from '../sections/AuthLogin';
import styles from '../styles/Home.module.css';

const SignUpSuccess = () => {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push(PATH.home);
  }

  return (
    <>
      <Head>
        <title>Sign Up Success| Twitter Clone</title>
      </Head>
      <main className={styles.main}>
        <Card className={styles.signUpSuccess}>
          <Image src="/success.png" alt="Picture of the author" width={156} height={203} />
          <div>
            <h4>Welcome aboard! Your account has been created!</h4>
            <p>
              You can now login to your account to start enjoying the benefits of using Advance!
            </p>
          </div>
          <ButtonContainer marginTop={false}>
            <Button type="button" onClick={() => router.push(PATH.login)}>
              Login to my account
            </Button>
            <Link href={'/'}>Back to home</Link>
          </ButtonContainer>
        </Card>
      </main>
    </>
  );
};

export default SignUpSuccess;
