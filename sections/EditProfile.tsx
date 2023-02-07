import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { QueryCache, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdExitToApp } from 'react-icons/md';
import ControlledInputField from '../components/form/ControlledInputField';
import FormProvider from '../components/form/FormProvider';
import DashboardLayout from '../components/layouts/dashboard';
import NavigationLayout from '../components/layouts/navigation';
import SidebarLayout from '../components/layouts/sidebar';
import TimelineLayout from '../components/layouts/timeline';
import People from '../components/people';
import Button from '../components/ui-kit/Button';
import ButtonContainer from '../components/ui-kit/ButtonContainer';
import Card from '../components/ui-kit/Card';
import IconButton from '../components/ui-kit/IconButton';
import Link from '../components/ui-kit/Link';
import Spinner from '../components/ui-kit/Spinner';
import { useIsTablet } from '../hooks/mediaQuery';
import { useGetProfileFromId, useGetProfiles } from '../hooks/profiles';
import { PATH } from '../routes/paths';
import useAlertStore from '../store';

type FormFields = {
  displayName: string;
  username: string;
};

const EditProfile = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const qc = useQueryClient();
  const { addAlert } = useAlertStore();
  const { data: profiles, isLoading: profileLoading } = useGetProfiles();
  const { data: userProfile, isLoading: userProfileLoading } =
    useGetProfileFromId(user?.id as string);

  const isTablet = useIsTablet();

  const methods = useForm<FormFields>({
    mode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, isDirty },
  } = methods;

  const getUniqueUsernames = () => {
    const usernames =
      profiles?.length &&
      profiles.map((profile) => {
        return profile.username;
      });
    const idx = usernames ? usernames?.indexOf(userProfile?.username) : -1;
    if (idx > -1 && usernames) {
      usernames.splice(idx, 1);
    }
    if (usernames) {
      return usernames;
    } else {
      return [];
    }
  };

  const VALIDATIONS = {
    displayName: {
      required: { value: true, message: 'This field is required' },
    },
    username: {
      required: { value: true, message: 'This field is required' },
      minLength: { value: 3, message: 'Minimum of 3 characters' },
      validate: (val: string) => {
        if (getUniqueUsernames()) {
          if (getUniqueUsernames().indexOf(val) > -1) {
            return 'That username has already been taken.';
          }
        }
      },
    },
  };

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      addAlert({
        message: error.message || 'Error signing out',
        type: 'error',
      });
    } else {
      const queryCache = new QueryCache();
      queryCache.clear();
      addAlert({
        message: 'Signed out',
        type: 'success',
      });
      router.push('/');
    }
  };

  const onSubmit = async (data: FormFields) => {
    const { error: userError } = await supabaseClient.auth.updateUser({
      data: {
        username: data.username,
        display_name: data.displayName,
      },
    });
    if (!userError) {
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .update({
          username: data.username,
          display_name: data.displayName,
        })
        .eq('id', user?.id);
      if (profileError) {
        addAlert({
          message: profileError.message,
          type: 'error',
        });
      } else {
        addAlert({
          message: 'Successfully updated profile',
          type: 'success',
        });
        await supabaseClient.auth.refreshSession();
        qc.invalidateQueries(['profile', user?.id]);
        reset({
          username: data.username,
          displayName: data.displayName,
        });
      }
    } else {
      addAlert({
        message: userError.message,
        type: 'error',
      });
    }
  };

  const onError = (error: any) => {
    console.log('form', error);
  };

  return (
    <DashboardLayout>
      <NavigationLayout user={user} condensed={!isTablet}>
        {isTablet ? (
          <IconButton
            outlined={false}
            width={30}
            height={30}
            icon={<MdExitToApp size={30} onClick={handleSignOut} />}
          />
        ) : (
          <Button onClick={handleSignOut}>Sign out</Button>
        )}
      </NavigationLayout>

      <TimelineLayout>
        {!userProfile ? (
          <Spinner type="dots" />
        ) : (
          <Card fullWidth padding="1rem">
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <ControlledInputField
                name="displayName"
                label="Display Name"
                placeholder="ex. Oreoyoyo"
                type="text"
                defaultValue={userProfile.display_name}
                rules={VALIDATIONS.displayName}
              />
              <ControlledInputField
                name="username"
                label="Username"
                placeholder="ex. juanititato"
                type="text"
                defaultValue={userProfile.username}
                rules={VALIDATIONS.username}
              />
              <ButtonContainer>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting || !isDirty}
                  loading={isSubmitting}
                  fullWidth
                >
                  Update My Profile
                </Button>
                <Link href={PATH.home}>Back to Home</Link>
              </ButtonContainer>
            </FormProvider>
          </Card>
        )}
      </TimelineLayout>
      {!isTablet ? (
        <SidebarLayout>
          {profiles?.map((profile) => {
            if (!profile.display_name || !profile.username) return null;
            if (profile.username === user?.user_metadata?.username) return null;
            return (
              <People
                key={profile.id}
                name={profile.display_name}
                username={profile.username}
              />
            );
          })}
        </SidebarLayout>
      ) : null}
    </DashboardLayout>
  );
};

export default EditProfile;
