import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pick } from "lodash";
import { GetStaticProps } from "next";
import Link from "next/link";
import ActivityBlock from "../components/ActivityBlock";
import MainLayout from "../layouts/common";
import { getWeeksInYear } from "../utils/date";

const RunningPage = () => {
  const year = 2022;
  const amountOfWeeks = getWeeksInYear(year);
  const weeks = [];
  for (let i = 1; i <= amountOfWeeks; i++) {
    weeks.push({ block: `${year}w${i}`, grade: Math.floor(Math.random() * 6) });
  }

  return (
    <MainLayout className="px-0">
      <Link href="running/add">
        <a className="fixed right-0 bottom-0 m-5 rounded-md bg-prime-800 p-4 text-lg text-white">
          <FontAwesomeIcon icon={faAdd} className="mr-2" />
          Add Run
        </a>
      </Link>
      <div className="mx-auto max-w-lg bg-gray-700">
        <h1>43K in {year}</h1>
        <div className="grid grid-cols-12 gap-2 rounded-md p-2 md:gap-2">
          {weeks.map((i) => (
            <ActivityBlock key={i.block} grade={i.grade} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

RunningPage.messages = [...MainLayout.messages];
export default RunningPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../messages/${locale}.json`),
      RunningPage.messages
    ),
  },
});
