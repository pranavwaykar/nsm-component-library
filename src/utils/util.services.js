export function classNames() {
  let classString = "";
  for (const argument of arguments) {
    if (argument) {
      if (classString === "") {
        classString = `${argument}`;
      } else {
        classString = classString + ` ${argument}`;
      }
    }
  }

  return classString;
}

export const getQueryParams = (key = "") => {
  let params = new URLSearchParams(window.location.search);
  return params.get(key) || "";
};

export const openMail = (mailAddress) => {
  window.open("mailto:" + mailAddress, "_blank");
};

export const openTeams = (mailAddress, message = "") => {
  window.open(
    "MSTeams:/l/chat/0/0?users=" +
      mailAddress +
      `${message && `&message=${message}`}`,
    "_blank"
  );
};

export const objectToQueryString2 = (params) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return `${queryString}`;
};

export function convertToISTDate(utcDateString) {
  const utcDate = new Date(utcDateString);
  const istOffset = 330;
  const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);
  const day = String(istDate.getDate()).padStart(2, "0");
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const year = istDate.getFullYear();
  return `${day}.${month}.${year}`;
}

export const getUserThumbnailByUserName = (userName = "") => {
  return `https://ikbackend.gsi365.com/api/photoDataUserName/${userName}`;
};

export const getUserThumbnailByUserId = (userId) => {
  return `https://www.mecellem.com/assets/profile-photos/small/${userId}.png`;
};

export const getTimeAgo = (createdAt) => {
  if (!createdAt) return "Unknown time";
  const diff = Math.floor((new Date() - new Date(createdAt)) / 1000);
  const timeUnits = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];
  for (const unit of timeUnits) {
    const interval = Math.floor(diff / unit.seconds);
    if (interval >= 1)
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

export function formatTime(date = new Date(), separater = ":") {
  const dates = new Date(date);
  const hours = String(dates.getHours()).padStart(2, "0");
  const minutes = String(dates.getMinutes()).padStart(2, "0");
  return `${hours}${separater}${minutes}`;
}

export function getYearMonthDayInTimeZone(utcDateString, timeZone) {
  const date = new Date(utcDateString);
  const options = {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year").value;
  const month = parts.find((part) => part.type === "month").value;
  const day = parts.find((part) => part.type === "day").value;
  return `${day}.${month}.${year}`;
}

export function formatDate(date = new Date(), separater = ".") {
  const dates = new Date(date);
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  return `${day}${"."}${month}${"."}${year}`;
}

// Stable key for day-level comparisons, avoids locale/format issues
export function dateKeyYMD(dateInput = new Date()) {
  const d = new Date(dateInput);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const formatUTCDateTime = (utcDateString) => {
  const date = new Date(utcDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}.${month}.${year} | ${hours}:${minutes}:${seconds}`;
};

export const formatDateTime = (date = new Date(), separater = ":") => {
  const dates = new Date(date);
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  const hours = String(dates.getHours()).padStart(2, "0");
  const minutes = String(dates.getMinutes()).padStart(2, "0");
  return `${day}${separater}${month}${separater}${year} ${hours}:${minutes}`;
};

export const formatDownloadReportDateTime = (
  date = new Date(),
  separater = "."
) => {
  const dates = new Date(date);
  const day = String(dates.getDate()).padStart(2, "0");
  const month = String(dates.getMonth() + 1).padStart(2, "0");
  const year = dates.getFullYear();
  const hours = String(dates.getHours()).padStart(2, "0");
  const minutes = String(dates.getMinutes()).padStart(2, "0");
  const hyphenSeparater = "-";
  return `${day}${separater}${month}${separater}${year}${separater}${hours}${hyphenSeparater}${minutes}`;
};

export const scrollToElement = (element) => {
  element?.scrollIntoView({ behavior: "smooth" });
};

export const objectToQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

export const addMatterIdToUrl = (pathname) => {
  return `${pathname}${window?.location?.search}`;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getFileAsset = (name = "") => {
  const extSplits = name?.split(".");
  const ext = extSplits[extSplits?.length - 1] || "";
  const imageAsset = {
    icon: "icon-image",
    color: "#2c9fff",
  };
  const excelAsset = {
    icon: "icon-excel",
    color: "#009e24",
  };
  const videoAsset = {
    icon: "icon-play-circle-solid",
    color: "#929ceb",
  };
  const audioAsset = {
    icon: "icon-microphone",
    color: "#929ceb",
  };
  switch (ext?.toLowerCase()) {
    case "docx":
    case "doc":
      return { icon: "icon-word", color: "#226fea" };
    case "pdf":
      return { icon: "icon-pdf", color: "#e61919" };
    case "ppt":
    case "pptx":
      return { icon: "icon-powerpoint", color: "#ff6412" };
    case "png":
    case "jpg":
    case "jpeg":
    case "heic":
      return imageAsset;
    case "xlsx":
    case "csv":
    case "xlsm":
      return excelAsset;
    case "mp4":
    case "mov":
    case "avi":
      return videoAsset;
    case "mp3":
    case "wav":
      return audioAsset;
    default:
      return { icon: "icon-file-lines", color: "#000000" };
  }
};

export const degTorad = (degrees) => degrees * (Math.PI / 180);

export const translatedMonths = [
  { en: "January", tr: "Ocak" },
  { en: "February", tr: "Şubat" },
  { en: "March", tr: "Mart" },
  { en: "April", tr: "Nisan" },
  { en: "May", tr: "Mayıs" },
  { en: "June", tr: "Haziran" },
  { en: "July", tr: "Temmuz" },
  { en: "August", tr: "Ağustos" },
  { en: "September", tr: "Eylül" },
  { en: "October", tr: "Ekim" },
  { en: "November", tr: "Kasım" },
  { en: "December", tr: "Aralık" },
];

export const translatedDays = [
  { en: "Mon", tr: "Pzt" },
  { en: "Tue", tr: "Sal" },
  { en: "Wed", tr: "Çar" },
  { en: "Thu", tr: "Per" },
  { en: "Fri", tr: "Cum" },
  { en: "Sat", tr: "Cmt" },
  { en: "Sun", tr: "Paz" },
];

export const firstDayOfYear = (year = new Date().getFullYear()) =>
  new Date(year, 0, 1);
export const lastDayOfYear = (year = new Date().getFullYear()) =>
  new Date(year, 11, 31);

export const firstDayOfWeek = (dateObject, firstDayOfWeekIndex) => {
  const dayOfWeek = dateObject.getDay(),
    firstDayOfWeek = new Date(dateObject),
    diff =
      dayOfWeek >= firstDayOfWeekIndex
        ? dayOfWeek - firstDayOfWeekIndex
        : 6 - dayOfWeek;
  firstDayOfWeek.setDate(dateObject.getDate() - diff);
  firstDayOfWeek.setHours(0, 0, 0, 0);
  return firstDayOfWeek;
};

export function getDateRanges(months = 3, date = new Date()) {
  if (months === 1) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
  } else {
    const endDate = new Date();
    function getStartDate(monthsBack) {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - monthsBack);
      return startDate;
    }
    return {
      startDate: getStartDate(months),
      endDate: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        23,
        59,
        59,
        999
      ),
    };
  }
}

export const getWeeksOfMonth = (year, month_number) => {
  var firstOfMonth = new Date(year, month_number, 1);
  var lastOfMonth = new Date(year, month_number, 0);
  var used = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil(used / 7);
};

export function getWeeksInMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const weeks = Math.ceil((daysInMonth + startingDayOfWeek) / 7);
  return weeks;
}

export function isDateInYear(date, year) {
  return date.getFullYear() === year;
}

export const monthsWithTranslation = [
  { en: "January", tr: "Ocak", English: "January", Türkçe: "Ocak" },
  { en: "February", tr: "Şubat", English: "February", Türkçe: "Şubat" },
  { en: "March", tr: "Mart", English: "March", Türkçe: "Mart" },
  { en: "April", tr: "Nisan", English: "April", Türkçe: "Nisan" },
  { en: "May", tr: "Mayıs", English: "May", Türkçe: "Mayıs" },
  { en: "June", tr: "Haziran", English: "June", Türkçe: "Haziran" },
  { en: "July", tr: "Temmuz", English: "July", Türkçe: "Temmuz" },
  { en: "August", tr: "Ağustos", English: "August", Türkçe: "Ağustos" },
  { en: "September", tr: "Eylül", English: "September", Türkçe: "Eylül" },
  { en: "October", tr: "Ekim", English: "October", Türkçe: "Ekim" },
  { en: "November", tr: "Kasım", English: "November", Türkçe: "Kasım" },
  { en: "December", tr: "Aralık", English: "December", Türkçe: "Aralık" },
];

export const extractParams = (location) => {
  const queryParams = new URLSearchParams(location.search);
  const matterId = queryParams.get("matter_id");
  const paramsString = queryParams.get("params");
  const paramsObject = paramsString
    ? JSON.parse(decodeURIComponent(paramsString))
    : null;
  return { matterId, paramsObject };
};

export function capitalizeSentence(sentence = "") {
  return sentence
    .split(" ")
    .map((word) => word?.charAt(0)?.toUpperCase() + word.slice(1)?.toLowerCase())
    .join(" ");
}

export const textEllipses = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};


