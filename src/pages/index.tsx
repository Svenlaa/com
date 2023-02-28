import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import pick from "lodash/pick";
import CommonLayout from "../layouts/common";
import {
  faGithub,
  faGitlab,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import ProfileCard from "../components/profileCard";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layouts/common";

const profile = {
  name: "Sven Lammertink",
  pictureUrl: "https://github.com/Svenlaa.png",
  role: "Software developer",
  links: [
    { href: "https://github.com/Svenlaa", icon: faGithub, label: "GitHub" },
    { href: "https://gitlab.com/Svenlaa", icon: faGitlab, label: "GitLab" },
    {
      href: "https://linkedin.com/in/svenlaa",
      icon: faLinkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:sven.lammertink@hotmail.com",
      icon: faEnvelope,
      label: "email",
    },
  ],
};

const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <CommonLayout className="flex h-full items-center justify-center">
      <ProfileCard
        cta={{ label: t("cta_label"), message: t("cta_message") }}
        profile={profile}
      />
    </CommonLayout>
  );
};

HomePage.messages = ["Home", ...MainLayout.messages];
export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      HomePage.messages
    ),
  },
});
