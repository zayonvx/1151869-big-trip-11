import {EVENT_TYPES, EVENT_OPTIONS, DESCRIPTIONS, PHOTOS, CITIES, PRICE_MAX, PRICE_MIN} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, getRandomDate, buildArray, filterArray} from "../utils/common.js";

const EVENTS_COUNT_MIN = 5;
const EVENTS_COUNT_MAX = 20;

const EVENTS_COUNT = getRandomIntegerNumber(EVENTS_COUNT_MIN, EVENTS_COUNT_MAX);


const generateOptions = (array) => {
  return filterArray(array).sort((a, b) => b.cost - a.cost);
};

const generateEvent = () => {
  const startDate = getRandomDate(new Date());

  return {
    type: getRandomArrayItem(EVENT_TYPES),
    city: getRandomArrayItem(CITIES),
    options: generateOptions(EVENT_OPTIONS),
    info: {
      description: buildArray(DESCRIPTIONS),
      photos: buildArray(PHOTOS),
    },
    price: getRandomIntegerNumber(PRICE_MIN, PRICE_MAX),
    startDate,
    endDate: getRandomDate(startDate),
    isFavorite: Math.random() > 0.5 ? true : false,
  };
};

const generateEvents = (count) => {
  return new Array(count)
  .fill(``).map(() => generateEvent())
  .sort((a, b) => a.startDate - b.startDate);
};

export const EVENTS = generateEvents(EVENTS_COUNT).slice().sort((a, b) => a.startDate.getMonth() - b.startDate.getMonth());
