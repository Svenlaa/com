import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import { pad } from "./pad";

dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

export const getWeek = (date: Date) => dayjs(date).isoWeek();
export const getStartOfWeek = (date: Date) =>
  dayjs(date).startOf("isoWeek").toDate();

export const formatDate = (date: Date) =>
  date.toISOString().split("T")[0] ?? "";

export const formatToTimeString = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

// Doesn't always work if the week is in the next/last year
export const formatYearWeek = (date: Date) => {
  let year = date.getFullYear();
  const week = getWeek(date);
  const month = date.getMonth();
  if (week === 1 && month === 11) year++;
  if (week > 50 && month === 0) year--;

  return `${year}w${week}`;
};

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

// Time Notation based on Swash Internet Time and French Decimal Time
// UBT is based on UTC, instead of CET like Swash Internet Time
export const currentUbt = () =>
  Math.floor(((new Date().getTime() % 86400000) / 86400000) * 1000);

export const convertUbtToTimestamp = (ubt: number) => {
  let s = (ubt / 1000) * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);

  return `${pad(h, 2)}:${pad(m, 2)}`;
};
