import Link from "next/link";
import { useRouter } from "next/router";

type ActivityBlockProps = {
  grade: number;
  yearWeek: string;
};

const ActivityBlock = ({ grade, yearWeek }: ActivityBlockProps) => {
  let bgColor = "";
  if (grade === 1) bgColor = "rgb(14, 68, 41)";
  if (grade === 2) bgColor = "rgb(0, 109, 50)";
  if (grade === 3) bgColor = "rgb(38, 166, 65)";
  if (grade === 4) bgColor = "rgb(57, 211, 83)";
  const router = useRouter();

  const url = `${router.pathname}?filter=${yearWeek}`;

  return (
    <Link href={url}>
      <span
        data-aria-grade={grade}
        className={`flex aspect-square items-center justify-center rounded-sm border-[1px] border-black/30 bg-black/5 p-1 text-center leading-none text-black/75 dark:bg-white/5 dark:text-white/75`}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      />
    </Link>
  );
};

export default ActivityBlock;
