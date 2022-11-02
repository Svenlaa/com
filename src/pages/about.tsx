import { pick } from "lodash";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import Item, { ItemProps } from "../components/about/item";
import MainLayout from "../layouts/common";

const workItems: ItemProps["item"][] = [
  {
    startDate: "2022",
    endDate: "",
    title: "Software Developer",
    isInternship: true,
    company: "TradeRealm",
    companyUrl: "https://traderealm.nl/",
    details: [
      "to_typescript",
      "learn_use_react",
      "teamwork",
      "built_personal_site",
    ],
  },
  {
    startDate: "2017",
    endDate: "2019",
    title: "stocker",
    tTitle: true,
    company: "Coop Leon Haanstra",
    details: ["stocked_shelves"],
  },
];

const educationItems: ItemProps["item"][] = [
  {
    company: "EEGA",
    companyUrl: "https://eegaplus.nl",
    startDate: "2021",
    endDate: "",
    title: "eega_title",
    tTitle: true,
  },
  {
    company: "Reggesteyn, Ambelt",
    startDate: "2015",
    endDate: "2020",
    title: "Havo NG, NT",
    details: [
      "unfinished",
      "❂Profiel 3, Natuur & Gezondheid, gevolgd",
      "❂Profiel 4, Natuur & Techniek, gevolgd",
    ],
  },
];

const AboutPage = () => {
  const t = useTranslations("About");
  return (
    <MainLayout className="mx-auto md:max-w-lg">
      <h1 className="text-2xl font-bold">{t("experience")}</h1>
      {workItems.map((item, i) => (
        <Item item={item} key={i} t={t} />
      ))}
      <h1 className="text-2xl font-bold">{t("education")}</h1>
      {educationItems.map((item, i) => (
        <Item key={i} item={item} t={t} />
      ))}
    </MainLayout>
  );
};

AboutPage.messages = ["About", ...MainLayout.messages];
export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      AboutPage.messages
    ),
  },
});
