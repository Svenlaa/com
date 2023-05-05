import { useTranslations } from "next-intl";
import CommonLayout from "./../layouts/common";
import { GetStaticProps } from "next";
import pick from "lodash/pick";

const NotFoundPage = () => {
  const t = useTranslations("404");

  return (
    <CommonLayout className="flex h-full items-center justify-center">
      <h1 className="text-5xl font-semibold">404: {t("page_not_found")}</h1>
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
