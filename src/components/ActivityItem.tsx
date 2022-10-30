import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

type Props = {
  item: {
    date: string;
    distance: number;
    id: string;
    yearWeek: string;
    runnerId: string;
  };
  showDelete?: boolean;
  onDelete?: (runId: string) => void;
};

const ActivityItem = ({ item, showDelete }: Props) => {
  const deleteRunMutation = trpc.running.deleteItem.useMutation();
  const utils = trpc.useContext();
  const onDelete = async (runId: string) => {
    await deleteRunMutation.mutate(runId, {
      onSuccess: () => {
        utils.running.getAll.invalidate();
      },
    });
  };
  const router = useRouter();
  const dateString = new Date(item.date).toLocaleDateString(router.locale, {
    dateStyle: "full",
  });
  return (
    <div className="my-4 mx-auto flex w-4/6 flex-row justify-between ">
      <p className="text-l font-bold text-prime-600 dark:text-prime-400">
        {dateString}
      </p>
      <div>
        <span>{item.distance / 1000}km</span>
        {showDelete && (
          <button
            className="ml-2 text-red-600 hover:text-red-500 dark:text-red-400"
            onClick={() => onDelete(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
