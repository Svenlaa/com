import { useRouter } from "next/router";

type Props = {
  item: {
    date: string;
    distance: number;
    id: string;
    yearWeek: string;
  };
};

const ActivityItem = ({ item }: Props) => {
  const router = useRouter();
  const dateString = new Date(item.date).toLocaleDateString(router.locale, {
    dateStyle: "full",
  });
  return (
    <div className="my-4 mx-auto flex w-4/6 flex-row justify-between ">
      <p className="text-l font-bold text-prime-600 dark:text-prime-400">
        {dateString}
      </p>
      <span>{item.distance / 1000}km</span>
    </div>
  );
};

export default ActivityItem;
