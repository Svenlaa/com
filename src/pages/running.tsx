import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pick } from "lodash";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
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
  // Remove filter on year change
  const [year, setYearState] = useState(new Date().getFullYear());
  const setYear = (targetYear: number) => {
    router.push(router.basePath, undefined, { shallow: true });
    setYearState(targetYear);
  };

  const amountOfWeeks = getWeeksInYear(year);
  const weeks: Prop[] = [];
  const utils = trpc.useContext();
  const getRunsQuery = trpc.running.getAll;
  const { isLoading, data: runs } = getRunsQuery.useQuery(year);
  const deleteMutation = trpc.running.deleteItem.useMutation();
  const onDelete = (runId: string) => {
    deleteMutation.mutate(runId, {
      onSuccess: () => {
        utils.running.getAll.invalidate();
      },
    });
  };
  const { data: session } = useSession();
  const t = useTranslations("Running");

  const router = useRouter();
  const filter = router.query.filter ?? null;

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    weeks[i]!.grade =
      distances[i] === 0 ? 0 : Math.ceil((1 / (maxDistance / v)) * 4);
  });

  const filteredRuns = runs?.filter(
    (v) => filter === null || v.yearWeek === filter
  );

  return (
    <MainLayout className="mx-auto max-w-xl py-4 px-0 md:max-w-xl">
      <div className="mx-2 rounded-md bg-black/20 p-1 dark:bg-white/20">
        <div className="mx-4 flex flex-row justify-between text-black/75  dark:text-white/75">
          <button
            onClick={() => setYear(year - 1)}
            aria-label={t("previous_year")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="px-2 py-1 pb-0 text-center font-bold text-black/80 dark:text-gray-200">
            {yearlyDistance}km in {year}
          </h1>
          <button
            aria-label={t("next_year")}
            onClick={() => setYear(year + 1)}
            disabled={year >= new Date().getFullYear()}
            className="disabled:text-black/25 dark:disabled:text-white/25"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className="grid grid-cols-12 gap-2 rounded-md p-2 md:gap-2">
          {weeks.map((week) => (
            <ActivityBlock
              key={week.block}
              yearWeek={week.block}
              grade={week.grade || 0}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto w-96 pb-2 transition-all">
        {session && (
          <Link href="/running/add">
            <a className="my-4 mx-auto flex flex-col text-center text-lg font-bold hover:text-prime-800 dark:hover:text-prime-200">
              {t("add")}
            </a>
          </Link>
        )}
        {isLoading && (
          <div className="my-4 mx-auto flex items-center justify-center rounded-lg bg-white p-4 px-6 text-center dark:bg-white/10 ">
            <span className="text-lg font-semibold">{t("loading")}</span>
          </div>
        )}
        {!filteredRuns?.length && !isLoading && (
          <div className="my-4 mx-auto flex items-center justify-center rounded-lg bg-white p-4 px-6 text-center dark:bg-white/10 ">
            <span className="text-lg font-semibold">
              {t("nothing_found")} ☹️
            </span>
          </div>
        )}
        {filteredRuns?.map((run) => (
          <ActivityItem
            item={run}
            showDelete={session?.user?.id === run.runnerId}
            key={run.id}
            onDelete={onDelete}
          />
        ))}
      </div>
      <Link href={router.pathname}>
        <div className="fixed left-0 top-0 -z-10 h-screen w-screen" />
      </Link>
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
