// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { NextIntlProvider } from "next-intl";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null; messages: IntlMessages }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextIntlProvider messages={pageProps.messages}>
        <Head>
          <title>Svenlaa</title>
          <meta name="description" content="Svenlaa's website" />
        </Head>
        <Component {...pageProps} />
      </NextIntlProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
