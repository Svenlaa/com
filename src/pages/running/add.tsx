import { pick } from "lodash";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "../../components/form/input";
import MainLayout from "../../layouts/common";
import { trpc } from "../../utils/trpc";

const AddRunPage = () => {
  const createRun = trpc.running.create.useMutation();
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/account");
    },
  });

  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  const t = useTranslations("RunningAdd");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const timeArr = time.split(":") as [string, string];
    if (!distance && !time) return;
    createRun.mutate(
      {
        distance: +distance * 1000,
        date: date || undefined,
        time: +timeArr[0] * 60 + +timeArr[1],
      },
      {
        onSuccess: () => {
          setDate("");
          setDistance("");
          setTime("");
        },
      }
    );
  };

  return (
    <MainLayout className="flex h-full flex-col justify-center">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-4/6 rounded-md bg-black/20 p-4 dark:bg-white/20 md:w-2/6"
      >
        <Input label={t("date")} val={date} set={setDate} type="date" />
        <Input
          label={t("time")}
          val={time}
          set={setTime}
          type="text"
          pattern="[0-9]*:[0-9][0-9]"
          placeholder="121:09"
          required
        />
        <Input
          label={t("distance")}
          unit="km"
          val={distance}
          set={setDistance}
          type="number"
          step="0.05"
          min="1"
          max="1000"
          placeholder="42.2"
          required
        />

        <button
          disabled={createRun.isLoading}
          type="submit"
          className="mt-2 w-full rounded-md bg-white p-2 text-black hover:bg-gray-100 disabled:bg-gray-300"
        >
          {t("submit")}
        </button>
      </form>
    </MainLayout>
  );
};

AddRunPage.messages = ["RunningAdd", ...MainLayout.messages];
export default AddRunPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick(
      await import(`../../../messages/${locale}.json`),
      AddRunPage.messages
    ),
  },
});
