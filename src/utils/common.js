import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import {MONTHS} from "../const";

momentDurationFormatSetup(moment);

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
  const targetDate = new Date();
  const day = date ? date.getDate() : targetDate.getDate();
  const hour = date ? date.getHours() : targetDate.getHours();
  const min = date ? date.getMinutes() : targetDate.getMinutes();
  const diffDays = getRandomIntegerNumber(0, 7);
  const diffMinutes = getRandomIntegerNumber(0, 60);
  const diffHours = getRandomIntegerNumber(0, 24);

  targetDate.setDate(day + diffDays);
  targetDate.setHours(hour + diffHours);
  targetDate.setMinutes(min + diffMinutes);

  return targetDate;
};

export const formatDate = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDateDiff = (start, end) => {
  const dateEnd = moment(end);
  const dateStart = moment(start);
  const duration = moment.duration(dateEnd.diff(dateStart));

  return duration.format(`d[D] h[H] m[M]`, {trim: `all`});
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
      optionsPrice += events[i].options[j].price;
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

export const buildUniqueArray = (array) => {
  const uniqueSet = new Set(array);
  return Array.from(uniqueSet);
};

export const ucFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

