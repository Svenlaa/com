import Link from "next/link";
import { useRouter } from "next/router";

type FlagProps = {
  label: string;
  code: string;
  langName?: string;
  className?: string;
};
const Flag = ({ label, code, langName, className }: FlagProps) => {
  const router = useRouter();
  const active = router.locale === code;
  return (
    <Link href={router.pathname} locale={code}>
      <a
        className={`rounded-md py-2 px-4 text-2xl ${
          active && "backdrop-brightness-90 dark:backdrop-brightness-125"
        } ${className}`}
        title={langName}
      >
        {label}
      </a>
    </Link>
  );
};

export default Flag;
