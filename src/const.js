export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const POINT_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];

export const PRICE_MIN = 100;
export const PRICE_MAX = 1000;

export const EVENT_OPTIONS = [
  {option: `Add luggage`, cost: 30},
  {option: `Switch to comfort class`, cost: 100},
  {option: `Add meal`, cost: 15},
  {option: `Choose seats`, cost: 5},
  {option: `Travel by train`, cost: 40},
];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const PHOTOS = [
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`
];

export const CITIES = [`Los Angeles`, `San-Bernardino`, `Barstow`, `Fresno`, `Bakersfield`, `Needles`, `Kingman`, `Seligman`];

export const MONTHS = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`
];

export const sortData = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};
