import Link from "next/link";
import { useRouter } from "next/router";

type ActivityBlockProps = {
  grade: 0 | 1 | 2 | 3 | 4;
  yearWeek: string;
  hasEvent?: boolean;
};

const ActivityBlock = ({ grade, yearWeek }: ActivityBlockProps) => {
  const router = useRouter();

  const url = `${router.pathname}?filter=${yearWeek}`;

  return (
    <Link href={url}>
      <span
        data-aria-grade={grade}
        className="gradeActivity flex aspect-square items-center justify-center rounded-sm border-[1px] border-black/30 bg-black/5 p-1 text-center leading-none text-black/75 dark:bg-white/5 dark:text-white/75"
      />
    </Link>
  );
};

export default ActivityBlock;
