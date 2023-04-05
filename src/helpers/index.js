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

export const formatOnlyDate = (timestamp) => {
  const localZone = Intl.DateTimeFormat().resolvedOptions();
  const empDate = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: localZone.timeZone,
    hourCycle: "h12",
    day: "2-digit",
    month: "short",
    year: "numeric",
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

export const parseStringArray = (arr) => {
  let convertedArr = [];
  if (arr) {
    convertedArr = arr.replace(/'/g, '"');
    convertedArr = JSON.parse(convertedArr);
    return convertedArr;
  }
  return null;
  // services = services.replace(/'/g, '"'); //replacing all ' with "
  // services = JSON.parse(services);
};

export const removeWhitespaces = (str) => {
  return str
    .replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    })
    .replace(/\s/g, "");
};

export function getIdValue(str) {
  if (str) {
    const val = Object.values(str);
    const index = val[0].indexOf("");
    const result = val[0].substr(index);
    return result.charAt(0);
  }
  return "";
}

export function getAfterUnderScoreValue(str) {
  if (str) {
    const val = Object.values(str);
    const index = val[0].lastIndexOf("_");
    const result = val[0].substr(index + 1);
    return result;
  }
  return "";
}

export function getSelectedValues(objectWithOnes) {
  // const keysWithOnes = [];
  // Object.keys(objectWithOnes).forEach((k) => {
  //   if (objectWithOnes[k] === "1") keysWithOnes.push(k);
  // });
  // for (const key in objectWithOnes) {
  //   if (objectWithOnes[key] === "1") {
  //     keysWithOnes.push(key);
  //   }
  // }
  const keysWithOnes = [];
  // const obj = Object.keys(objectWithOnes);
  for (const key of Object.keys(objectWithOnes)) {
    if (objectWithOnes[key] === "1") {
      keysWithOnes.push(key);
    }
  }
  return keysWithOnes;
  // if (keysWithOnes.length > 0) {
  //   return keysWithOnes;
  // }
  // return null;
}
