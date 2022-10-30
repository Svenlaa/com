import { pick } from "lodash";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ActivityBlock from "../components/ActivityBlock";
import ActivityItem from "../components/ActivityItem";
import MainLayout from "../layouts/common";
import { getWeeksInYear } from "../utils/date";
import { trpc } from "../utils/trpc";

type Prop = {
  block: string;
  grade?: number;
};

const RunningPage = () => {
  const year = 2022;
  const amountOfWeeks = getWeeksInYear(year);
  const weeks: Prop[] = [];
  const { isLoading, data: runs } = trpc.running.getAll.useQuery();
  const deleteMutation = trpc.running.deleteItem.useMutation();
  const onDelete = (runId: string) => {
    deleteMutation.mutate(runId);
  };
  const { data: session } = useSession();
  const t = useTranslations("Running");

  if (isLoading) return <p>Loading...</p>;

  const yearlyDistance =
    isLoading || !runs
      ? 0
      : runs.reduce((pSum, v) => pSum + v.distance, 0) / 1000;

  const distances: number[] = [];
  for (let i = 1; i <= amountOfWeeks; i++) {
    const yearWeek = `${year}w${i}`;

    const runsThisWeek =
      runs?.filter((item) => item.yearWeek === yearWeek) ?? [];

    const weeklyDistance =
      runsThisWeek?.reduce((pSum, v) => pSum + v.distance, 0) / 1000;

    distances.push(weeklyDistance);
    weeks.push({ block: yearWeek });
  }

  const maxDistance = Math.max(...distances);
  distances.forEach((v, i) => {
    weeks[i]!.grade =
      distances[i] === 0 ? 0 : Math.ceil((1 / (maxDistance / v)) * 4);
  });

  return (
    <MainLayout className="mx-auto max-w-lg py-4 px-0 md:max-w-xl">
      <div className="mx-2 rounded-md bg-black/20 p-1 dark:bg-white/20">
        <h1 className="px-2 py-1 pb-0 text-center font-bold text-black/80 dark:text-gray-200">
          {yearlyDistance}km in {year}
        </h1>
        <div className="mx- grid grid-cols-12 gap-2 rounded-md p-2 md:gap-2">
          {weeks.map((i) => (
            <ActivityBlock key={i.block} grade={i.grade || 0} />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-lg p-2">
        {session && (
          <Link href="/running/add">
            <a className="my-4 mx-auto flex w-4/6 flex-col text-center text-lg font-bold hover:text-prime-800 dark:hover:text-prime-200">
              {t("add")}
            </a>
          </Link>
        )}
        {runs?.map((run) => (
          <ActivityItem
            item={run}
            showDelete={session?.user?.id === run.runnerId}
            key={run.id}
            onDelete={onDelete}
          />
        ))}
      </div>
    </MainLayout>
  );
};

RunningPage.messages = ["Running", ...MainLayout.messages];
export default RunningPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      RunningPage.messages
    ),
  },
});
