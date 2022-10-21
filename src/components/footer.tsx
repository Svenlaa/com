import Link from "next/link";
import { useRouter } from "next/router";

type FlagProps = { label: string; code: string; langName?: string };
const Flag = ({ label, code, langName }: FlagProps) => {
  const router = useRouter();
  const active = router.locale === code;
  return (
    <Link href={router.pathname} locale={code}>
      <a
        className={`rounded-md py-2 px-4 text-2xl ${
          active && "backdrop-brightness-90 dark:backdrop-brightness-125"
        }`}
        title={langName}
      >
        {label}
      </a>
    </Link>
  );
};

const Footer = () => (
  <footer className="flex w-screen flex-row justify-center bg-gray-300 p-2 dark:bg-gray-700 ">
    <div className="flex w-5/6 flex-row justify-around md:w-3/6">
      <Flag label="🇳🇱" code="nl" langName="Nederlands" />
      <Flag label="🇬🇧" code="en" langName="English" />
    </div>
  </footer>
);

export default Footer;
