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
  if (!time) return "";

  // Check if time is a full UTC datetime string
  if (time.includes("T") && time.includes("Z")) {
    // Parse UTC string and convert to local time, then format as AM/PM
    return moment.utc(time).local().format("hh:mm A");
  } else {
    // Regular time string (HH:mm format)
    return moment(time, "HH:mm").format("hh:mm A");
  }
};

export const extractTimeFromUTC = (utcString: string) => {
  if (!utcString) return "";
  // Parse UTC string and convert to local time, then extract HH:MM
  return moment.utc(utcString).local().format("HH:mm");
};

export function formatHumanReadableDateTime(date: string, time: string) {
  console.log("time: ", time);
  console.log("date: ", date);

  // Extract date part from date parameter (YYYY-MM-DD)
  const datePart = date.split("T")[0];

  // Extract time part from time parameter (HH:mm:ss)
  const timePart = time.includes("T")
    ? time.split("T")[1].replace("Z", "").substring(0, 5)
    : time;

  // Combine date and time into a single string
  const dateTimeString = `${datePart} ${timePart}`;

  // Parse combined datetime as UTC and convert to local time
  const eventMoment = moment.utc(dateTimeString, "YYYY-MM-DD HH:mm").local();

  // Get current local time for comparison
  const now = moment();

  // Determine human-readable format
  if (eventMoment.isSame(now, "day")) {
    return `Today ${eventMoment.format("hh:mm A")}`;
  } else if (eventMoment.isSame(now.clone().add(1, "day"), "day")) {
    return `Tomorrow ${eventMoment.format("hh:mm A")}`;
  } else {
    return `${eventMoment.format("YYYY-MM-DD hh:mm A")}`;
  }
}
