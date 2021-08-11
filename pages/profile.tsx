import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import ProfileForm from '../components/profile/ProfileForm';

type IProps = {
  session: Session;
};

export default function profile({ session }: IProps) {
  return <ProfileForm />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
