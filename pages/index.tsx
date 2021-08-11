import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Welcome from '../components/Welcome';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();

      if (!session) {
        router.replace('/auth');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return !isLoading && <Welcome />;
}
