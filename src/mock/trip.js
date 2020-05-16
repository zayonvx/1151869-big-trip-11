import {EVENT_TYPES, EVENT_OPTIONS, DESCRIPTIONS, PHOTOS, CITIES, PRICE_MAX, PRICE_MIN} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, getRandomDate, buildArray} from "../utils/common.js";

const EVENTS_COUNT_MIN = 5;
const EVENTS_COUNT_MAX = 20;
const OPTIONS_COUNT_MIN = 0;
const OPTIONS_COUNT_MAX = 3;

const EVENTS_COUNT = getRandomIntegerNumber(EVENTS_COUNT_MIN, EVENTS_COUNT_MAX);


const generateOptions = (optionsCount, eventName) => {
  return EVENT_OPTIONS[eventName].slice(0, optionsCount).filter((option) => option);
};

const getRandomEventType = (eventsObject) => {
  return getRandomArrayItem(Object.keys(eventsObject));
};


const generateEvent = () => {
  const startDate = getRandomDate(new Date());
  const eventType = getRandomEventType(EVENT_TYPES);
  const OPTIONS_COUNT = getRandomIntegerNumber(OPTIONS_COUNT_MIN, OPTIONS_COUNT_MAX);

  return {
    type: eventType,
    city: getRandomArrayItem(CITIES),
    options: generateOptions(OPTIONS_COUNT, eventType),
    info: {
      description: buildArray(DESCRIPTIONS).join(` `),
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
