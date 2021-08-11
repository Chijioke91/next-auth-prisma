import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Next Auth</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
