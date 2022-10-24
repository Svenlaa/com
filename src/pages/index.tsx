import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import pick from "lodash/pick";
import CommonLayout from "../layouts/common";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ProfileCard from "../components/profileCard";

const profile = {
  name: "Sven Lammertink",
  pictureUrl: "/Sven.jpg",
  role: "Software developer",
  links: [
    { href: "https://github.com/Svenlaa", icon: faGithub },
    { href: "https://www.linkedin.com/in/svenlaa", icon: faLinkedin },
    { href: "https://twitter.com/Svenlaa", icon: faTwitter },
  ],
};

const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <CommonLayout className="flex h-full items-center justify-center">
      <ProfileCard ctaMessage={t("call_to_action")} profile={profile} />
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
