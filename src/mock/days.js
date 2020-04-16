import {MONTHS} from "../const";
import {getRandomArrayItem, getRandomIntegerNumber} from "../utils";

const DAYS_COUNT = 3;

const generateDaysCount = () => {
  return {
    number: getRandomIntegerNumber(1, 30),
    month: getRandomArrayItem(MONTHS)
  };
};

const generateDaysCounts = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateDaysCount);
};

const DAYS = generateDaysCounts(DAYS_COUNT);

export {DAYS}
