import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import pick from "lodash/pick";
import CommonLayout from "../layouts/common";

const HomePage = () => {
  const t = useTranslations("Home");

  const words = t("greeting").split(" ");
  const lastWord = words.pop();

  return (
    <CommonLayout className="flex h-full items-center justify-center">
      <h1 className="text-3xl font-extrabold first-letter:capitalize">
        {words.join(" ") + " "}
        <span className="font-extrabold text-blue-700 dark:text-blue-400">
          {lastWord}
        </span>
      </h1>
    </CommonLayout>
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
