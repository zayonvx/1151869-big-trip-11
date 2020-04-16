import {EVENT_TYPES, EVENT_OPTIONS, DESCRIPTIONS, PHOTOS, CITIES, PRICE_MAX, PRICE_MIN} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, getRandomBoolean, getRandomDate, buildArray} from "../utils.js";

const EVENTS_COUNT = 20;

const generateOptions = () => {
  return EVENT_OPTIONS.filter(() => getRandomBoolean()).sort(() => getRandomBoolean() ? 1 : -1);
};

const generateEvent = () => {
  const startDate = getRandomDate(new Date());

  return {
    type: getRandomArrayItem(EVENT_TYPES),
    city: getRandomArrayItem(CITIES),
    options: generateOptions(),
    info: {
      description: buildArray(DESCRIPTIONS),
      photos: buildArray(PHOTOS),
    },
    price: getRandomIntegerNumber(PRICE_MIN, PRICE_MAX),
    startDate,
    endDate: getRandomDate(startDate),
  };
};

const generateEvents = (count) => {
  return new Array(count)
  .fill(``).map(() => generateEvent())
  .sort((a, b) => a.startDate - b.startDate);
};

export const EVENTS = generateEvents(EVENTS_COUNT).slice().sort((a, b) => a.startDate.getDate() - b.startDate.getDate());
