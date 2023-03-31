import Link from "next/link";
import { useRouter } from "next/router";

type ActivityBlockProps = {
  grade: 0 | 1 | 2 | 3 | 4;
  yearWeek: string;
  hasEvent?: boolean;
};

const ActivityBlock = ({ grade, yearWeek, hasEvent }: ActivityBlockProps) => {
  const gradeColors = [
    "#0000",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ] as const;

  const firstColor = hasEvent ? "#f59e0b" : gradeColors[grade];
  const secondColor = !grade && hasEvent ? "#f59e0b" : gradeColors[grade];

  const router = useRouter();

  const url = `${router.pathname}?filter=${yearWeek}`;

  return (
    <Link href={url}>
      <span
        data-aria-grade={grade}
        className="flex aspect-square items-center justify-center rounded-sm border-[1px] border-black/30 bg-black/5 p-1 text-center leading-none text-black/75 dark:bg-white/5 dark:text-white/75"
        style={{
          background: `linear-gradient(135deg, ${firstColor} 0, ${firstColor} 50%, ${secondColor} 50%, ${secondColor} 100%)`,
        }}
      />
    </Link>
  );
};

export default ActivityBlock;
