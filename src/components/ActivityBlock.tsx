type ActivityBlockProps = {
  grade: number;
  week: number;
};

const ActivityBlock = ({ grade, week }: ActivityBlockProps) => {
  let bgColor = "";
  if (grade === 1) bgColor = "rgb(14, 68, 41)";
  if (grade === 2) bgColor = "rgb(0, 109, 50)";
  if (grade === 3) bgColor = "rgb(38, 166, 65)";
  if (grade === 4) bgColor = "rgb(57, 211, 83)";

  return (
    <span
      data-aria-grade={grade}
      className={`flex aspect-square items-center justify-center rounded-sm border-[1px] border-black/30 bg-black/5 p-1 text-center leading-none text-black/50 dark:bg-white/5 dark:text-white/50`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {week}
    </span>
  );
};

export default ActivityBlock;
