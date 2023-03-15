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
