import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const formatAndDivideNumber = (inputNumber: number): string => {
  let formattedNumber: string;

  if (inputNumber >= 1000000) {
    formattedNumber = (inputNumber / 1000000).toFixed(1);
  } else if (inputNumber >= 1000) {
    formattedNumber = (inputNumber / 1000).toFixed(1);
  } else {
    formattedNumber = inputNumber.toString();
  }

  return `${formattedNumber}${
    inputNumber >= 1000 ? (inputNumber >= 1000000 ? "M" : "K") : ""
  }`;
};

export function getJoinedDate(date: Date) {
  // Get the month and year from the Date object
  const month = date.getMonth(); // returns a value from 0 to 11
  const year = date.getFullYear();

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Construct the joined date string
  const joinedDate = `${monthNames[month]} ${year}`;

  return joinedDate;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keys: string[];
}

export const removeKeysFromQuery = ({ params, keys }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
