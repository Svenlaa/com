import {
  faClock,
  faGaugeHigh,
  faMapLocationDot,
  faRoute,
  faTrash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Run } from "@prisma/client";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { formatToTimeString } from "../utils/time";

type Props = {
  item: Run;
  showDelete?: boolean;
  onDelete?: (runId: string) => void;
};

const ActivityItem = ({ item, showDelete, onDelete = () => null }: Props) => {
  const router = useRouter();
  const dateString = new Date(item.date).toLocaleDateString(router.locale, {
    dateStyle: "full",
  });
  return (
    <div className="my-4 mx-auto flex flex-col justify-between rounded-lg bg-white p-4 px-6 dark:bg-white/10 ">
      <div className="flex flex-row justify-between text-lg">
        <p
          className={`font-bold ${
            item.isEvent
              ? "text-amber-600 dark:text-amber-400"
              : "text-prime-700 dark:text-prime-400"
          }`}
        >
          {dateString}
        </p>
        {showDelete && (
          <button
            className="ml-1 text-red-600 hover:text-red-500 dark:text-red-400"
            onClick={() => onDelete(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div className="mt-2 flex flex-row flex-nowrap justify-between">
        {item.location && !item.time && (
          <Detail icon={faMapLocationDot}>{item.location}</Detail>
        )}
        {item.time && (
          <Detail icon={faClock}>{formatToTimeString(item.time)}</Detail>
        )}
        <Detail icon={faRoute}>{item.distance / 1000}km</Detail>
        {item.time && item.distance && (
          <Detail icon={faGaugeHigh}>
            {(item.distance / 1000 / (item.time / 3600)).toFixed(1)} km/h
          </Detail>
        )}
      </div>
    </div>
  );
};

type DetailProps = { children: ReactNode; icon?: IconDefinition };
const Detail = ({ icon, children }: DetailProps) => (
  <span className="mx-1 whitespace-nowrap text-center text-gray-800 dark:text-gray-100">
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        className="mr-1 text-gray-600 dark:text-gray-300"
      />
    )}
    {children}
  </span>
);

export default ActivityItem;
