import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

export const getWeek = (date: Date) => dayjs(date).isoWeek();
export const getStartOfWeek = (date: Date) =>
  dayjs(date).startOf("isoWeek").toDate();

export const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const getFirstDayOfYear = (year: number) => {
  const date = new Date(`${year}-1-1`);
  const week = dayjs(date).isoWeek();
  const firstDayOfWeek = dayjs(date).startOf("isoWeek");

  return week === 1
    ? firstDayOfWeek.toDate()
    : dayjs(firstDayOfWeek).add(1, "week").toDate();
};

export const getWeeksInYear = (year: number) =>
  dayjs(`${year}-01-01`).isoWeeksInYear();
