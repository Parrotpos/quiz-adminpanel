import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentDateToUTC = () => {
  return moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
};

export const dateToUTC = (date: string) => {
  return moment(date).utc().format("DD-MMM-YYYY");
};
export const AMPMTIme = (time: string) => {
  return moment(time, "HH:mm").format("hh:mm A");
};

export function formatHumanReadableDateTime(date: string, time: string) {
  // Combine date and time into a single string
  const dateTimeString = `${date.split("T")[0]} ${time}`;

  // Parse combined datetime with moment
  const eventMoment = moment(dateTimeString, "YYYY-MM-DD HH:mm");

  // Determine human-readable format
  if (eventMoment.isSame(moment(), "day")) {
    return `Today ${eventMoment.format("h A")}`;
  } else if (eventMoment.isSame(moment().add(1, "day"), "day")) {
    return `Tomorrow ${eventMoment.format("h A")}`;
  } else {
    return `${eventMoment.format("YYYY-MM-DD h A")}`;
  }
}
