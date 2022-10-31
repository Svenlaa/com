export const formatToTimeString = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${("" + (seconds % 60)).padStart(2, "0")}`;
