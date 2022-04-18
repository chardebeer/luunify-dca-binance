import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import '../styles/TimePicker.css';

export default function App({ Component, pageProps: { session, ...pageProps }, err }: AppProps & { err: any }) {
  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <title>Binance DCA Bot</title>
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} err={err} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
