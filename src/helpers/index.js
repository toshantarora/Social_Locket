import { is, curryN, gte } from "ramda";

export const isNonEmptyArray = (arr) => {
  if (typeof arr === "object" && arr instanceof Array && arr?.length > 0) {
    return true;
  }

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

export const getAddress = (
  street,
  address1,
  address2,
  city,
  country,
  postalcode
) => {
  const addressComponents = [
    street,
    address1,
    address2,
    city,
    country,
    postalcode,
  ];
  const address = addressComponents
    .filter((component) => component !== null && component !== undefined)
    .join(", ");
  return address;
};

export function getIdValue(str) {
  if (str) {
    const val = Object.values(str);
    const valInStr = val.toString();
    const index = valInStr.split("_")[0];
    return index;
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
  if (typeof objectWithOnes !== "undefined" && objectWithOnes !== null) {
    for (const key of Object.keys(objectWithOnes)) {
      if (objectWithOnes[key] === "1") {
        keysWithOnes.push(key);
      }
    }
    return keysWithOnes;
  } else {
    return null;
  }
  // if (keysWithOnes.length > 0) {
  //   return keysWithOnes;
  // }
  // return null;
}
