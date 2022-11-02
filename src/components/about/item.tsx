import Link from "next/link";

export type ItemProps = {
  item: {
    startDate: string;
    endDate: string;
    title: string;
    tTitle?: boolean;
    company: string;
    companyUrl?: string;
    details?: string[];
    isInternship?: boolean;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
};
const Item = ({ item, t }: ItemProps) => {
  return (
    <div className="m-4 mx-auto w-full rounded-md bg-white p-3 pb-2 dark:bg-white/10">
      <p className="dark:text-white/70">
        {item.startDate === item.endDate
          ? item.startDate
          : `${item.startDate} - ${item.endDate || t("present")}`}
      </p>
      <div className="py-1 pl-4">
        <h2 className="px-1 text-lg font-bold">
          <span>
            {item.isInternship ? t("internship") + " " : ""}
            {item.tTitle ? t(item.title) : item.title}
          </span>{" "}
          -{" "}
          {item.companyUrl ? (
            <Link href={item.companyUrl}>
              <a className="underline hover:dark:text-blue-300">
                {item.company}
              </a>
            </Link>
          ) : (
            <span>{item.company}</span>
          )}
        </h2>
        {item.details && (
          <ul className="list-disc">
            {item.details.map((d, i) => (
              <li key={i} className="ml-4">
                {d.startsWith("❂") ? d.substring(1) : t(d)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Item;
