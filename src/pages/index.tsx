import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import pick from "lodash/pick";

const HomePage = () => {
  const t = useTranslations("Home");
  return (
    <>
      <p>{t("greeting")}</p>
    </>
  );
};

HomePage.messages = ["Home"];

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      HomePage.messages
    ),
  },
});

export default HomePage;
