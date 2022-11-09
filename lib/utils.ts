import dayjs from "dayjs";

export const dueDateToString = (date: Date | string | null) => {
  if (!date) return "";

  if (typeof date === "string") {
    return date.slice(0, -8);
  }

  if (date instanceof Date) {
    return date.toISOString().slice(0, -8);
  }

  return null;
};

export const dueDateToDate = (date: Date | string | null) => {
  if (!date) return null;

  if (typeof date === "string") {
    return new Date(date.slice(0, -8));
  }

  if (date instanceof Date) {
    return new Date(date.getTime() - new Date().getTimezoneOffset() * 60000);
  }

  return null;
};

// HRF = Human Readable Format
export const anyDateToHRF = (date: Date | string | null) => {
  let myDate: Date | string = "";

  if (!date) return myDate;

  if (typeof date === "string") {
    myDate = new Date(date.slice(0, -8));
    myDate = dayjs(myDate).format("MMM D, YYYY HH:mm");
  }

  if (date instanceof Date) {
    myDate = new Date(date.getTime() - new Date().getTimezoneOffset() * 60000);
    myDate = dayjs(myDate).format("MMM D, YYYY HH:mm");
  }

  return myDate;
};
