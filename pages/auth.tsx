import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

export default function auth() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();

      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return !isLoading && <AuthForm />;
}
