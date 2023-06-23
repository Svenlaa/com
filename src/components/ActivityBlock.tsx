import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type ActivityBlockProps = {
  grade: 0 | 1 | 2 | 3 | 4;
  yearWeek: string;
  hasEvent?: boolean;
  setFilter: Dispatch<SetStateAction<null | string>>;
};

const ActivityBlock = ({ grade, yearWeek, setFilter }: ActivityBlockProps) => (
  <button onClick={() => setFilter(yearWeek)}>
    <span
      data-aria-grade={grade}
      className="gradeActivity flex aspect-square items-center justify-center rounded-sm border-[1px] border-black/30 bg-black/5 p-1 text-center leading-none text-black/75 dark:bg-white/5 dark:text-white/75"
    />
  </button>
);

export default ActivityBlock;
