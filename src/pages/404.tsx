import { useTranslations } from "next-intl";
import CommonLayout from "./../layouts/common";
import { GetStaticProps } from "next";
import pick from "lodash/pick";

const NotFoundPage = () => {
  const t = useTranslations("404");

  return (
    <CommonLayout className="flex h-full items-center justify-center">
      <h1 className="flex flex-col items-center text-4xl font-semibold">
        <b className="text-center text-8xl">404</b>
        <span className="text-center">{t("page_not_found")}</span>
      </h1>
    </CommonLayout>
  );
};

NotFoundPage.messages = ["404", ...CommonLayout.messages];
export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      NotFoundPage.messages
    ),
  },
});
