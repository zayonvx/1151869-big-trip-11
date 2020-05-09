import {MONTHS} from "../const";

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

export const buildArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

export const getRandomDate = (date) => {
  const targetDate = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 7);
  const diffMinutes = getRandomIntegerNumber(0, 60);
  const diffHours = getRandomIntegerNumber(0, 24);

  targetDate.setDate(targetDate.getDate() + diffDays);
  targetDate.setDate(targetDate.getHours() + diffHours);
  targetDate.setMinutes(targetDate.getMinutes() + diffMinutes);

  return targetDate;
};

const displayDateFormat = (value) => {
  return `${value}`.padStart(2, `0`);
};

export const formatDate = (date, forForm = false) => {
  const years = displayDateFormat(date.getUTCFullYear()) % 2000;
  const months = displayDateFormat(date.getMonth());
  const days = displayDateFormat(date.getDate());
  const hours = displayDateFormat(date.getHours() % 12);
  const minutes = displayDateFormat(date.getMinutes());

  return forForm ? `${days}/${months}/${years} ${hours}:${minutes}` : `${hours}:${minutes}`;
};

export const formatDateDiff = (begin, end) => {
  let minutes = (end - begin) / (1000 * 60);
  let days;
  let hours;
  let result = ``;
  if (minutes >= 24 * 60) {
    days = displayDateFormat(Math.floor(minutes / (60 * 24)));
    minutes = minutes % (60 * 24);
    result += `${days}D `;
  }
  if (minutes >= 60) {
    hours = displayDateFormat(Math.floor(minutes / 60));
    minutes = minutes % 60;
    result += `${hours}H `;
  }
  minutes = displayDateFormat(minutes);
  result += `${minutes}M`;
  return result;
};

export const getTripInfoTitle = (events) => {
  return events.length <= 3 ? events.map((event) => event.city).join(` — `) : `${events[0].city} — ... — ${events[events.length - 1].city}`;
};

export const getTripInfoPrice = (events) => {
  let overallPrice = 0;
  let optionsPrice = 0;
  for (let i = 0; i < events.length; i++) {
    let itteractionPrice = events[i].price;
    overallPrice += itteractionPrice;
    for (let j = 0; j < events[i].options.length; j++) {
      optionsPrice += events[i].options[j].cost;
    }
  }
  return overallPrice + optionsPrice;
};

export const getTripInfoDates = (events) => {
  const startMonth = events[0].startDate.getMonth();
  const startDay = events[0].startDate.getDate();
  const endMonth = events[events.length - 1].endDate.getMonth();
  const endDay = events[events.length - 1].endDate.getDate();
  return `${MONTHS[startMonth]} ${startDay} — ${MONTHS[endMonth]} ${endDay}`;
};

export const filterArray = (array) => {
  return array.filter(() => getRandomBoolean());
};
