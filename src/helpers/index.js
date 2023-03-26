import { is, curryN, gte } from "ramda";

export const isNonEmptyArray = (arr) => {
  if (typeof arr === "object" && arr instanceof Array && arr?.length > 0)
    return true;

  return false;
};

export const isArray = (arr) => {
  if (typeof arr === "object" && arr instanceof Array) return true;

  return false;
};

export const isNonEmptyString = (str) => {
  if (typeof str === "string" && str?.length > 0) return true;

  return false;
};

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min) &&
    isNumber(max) &&
    isNumber(value) &&
    gte(value, min) &&
    gte(max, value)
  );
});
export const in200s = isWithin(200, 299);

export const formatDate = (timestamp) => {
  const localZone = Intl.DateTimeFormat().resolvedOptions();
  const empDate = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: localZone.timeZone,
    hourCycle: "h12",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(empDate);
};

export const getInitials = (string) => {
  if (string) {
    const initials = string
      .split(" ")
      .map(([firstLetter]) => firstLetter)
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .join("")
      .toUpperCase();
    return initials;
  }
  return null;
};

export const isNumber = (num) => {
  if (
    (typeof num === "string" &&
      num?.length > 0 &&
      !Number.isNaN(Number(num))) ||
    (typeof num === "number" && !Number.isNaN(num))
  ) {
    return true;
  }

  return false;
};
