import { GetStaticProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import pick from "lodash/pick";
import CommonLayout from "../layouts/common";

const AccountPage = () => {
  const { data: session } = useSession();
  const t = useTranslations("Account");

  const signInText = session
    ? t("signed_in_as") + session.user?.email
    : t("not_signed_in");

  return (
    <CommonLayout>
      <Welcome name={session?.user?.name} />
      <div className="flex flex-row flex-wrap">
        <p className="py-2 pr-3">{signInText}</p>
        <SignButton hasSession={!!session} />
      </div>
    </CommonLayout>
  );
};

AccountPage.messages = ["Account"];

export default AccountPage;

const Welcome = ({ name }: { name?: string | null }) => {
  const t = useTranslations("Account");

  return (
    <h1 className="text-3xl font-extrabold first-letter:capitalize">
      {t("welcome")}{" "}
      <span className="font-extrabold text-prime-700 dark:text-prime-400">
        {name ?? t("guest_name")}
      </span>
    </h1>
  );
};

const SignButton = ({ hasSession }: { hasSession?: boolean }) => {
  const t = useTranslations("Account");

  return (
    <button
      onClick={hasSession ? () => signOut() : () => signIn("github")}
      className="rounded-full bg-red-500 py-2 px-3 text-gray-200 dark:text-gray-900"
    >
      {hasSession ? t("sign_out") : t("sign_in_with") + "Github"}
    </button>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      AccountPage.messages
    ),
  },
});
