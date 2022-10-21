// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { NextIntlProvider } from "next-intl";
import Footer from "../components/footer";

const MyApp: AppType<{ session: Session | null; messages: IntlMessages }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
        <Footer />
      </NextIntlProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
