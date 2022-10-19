import { GetStaticProps, NextPage } from "next";
import { useTranslations } from "next-intl";

const YesPage: NextPage = () => {
  const t = useTranslations("Hello");
  return (
    <>
      <p>{t("greeting")}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: (await import(`../../messages/${locale}.json`)).default,
  },
});

export default YesPage;
