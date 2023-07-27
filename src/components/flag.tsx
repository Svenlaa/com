import Link from "next/link";
import { useRouter } from "next/router";

type FlagProps = {
  langCode: string;
  countryCode: string;
  langName?: string;
  className?: string;
};
const Flag = ({ langName, className, langCode, countryCode }: FlagProps) => {
  const router = useRouter();
  const active = router.locale === langCode;
  return (
    <Link
      href={router.pathname}
      locale={langCode}
      className={`h-full rounded-md py-2 px-4 font-emoji text-2xl ${
        active && "backdrop-brightness-90 dark:backdrop-brightness-125"
      } ${className}`}
      title={langName}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/flags/${countryCode.toUpperCase()}.svg`}
        alt={countryCode}
        className="h-[1.25em] min-w-[1em]"
      />
    </Link>
  );
};

export default Flag;
