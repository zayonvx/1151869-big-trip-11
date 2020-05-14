export const EVENT_TYPES = {
  'taxi': `transport`,
  'bus': `transport`,
  'train': `transport`,
  'ship': `transport`,
  'transport': `transport`,
  'drive': `transport`,
  'flight': `transport`,
  'check-in': `stop`,
  'sightseeing': `stop`,
  'restaurant': `stop`,
};

export const PRICE_MIN = 100;
export const PRICE_MAX = 1000;

// export const EVENT_OPTIONS = [
//   {option: `Add luggage`, cost: 30},
//   {option: `Switch to comfort class`, cost: 100},
//   {option: `Add meal`, cost: 15},
//   {option: `Choose seats`, cost: 5},
//   {option: `Travel by train`, cost: 40},
// ];

export const EVENT_OPTIONS = {
  'taxi': [{name: `uber`, description: `Order Uber`, price: 20}],
  'bus': [{name: `meal`, description: `Add a meal`, price: 15}],
  'train': [{name: `first-class`, description: `First Class`, price: 100}, {name: `child-meal`, description: `Meal for kid`, price: 15}],
  'ship': [{name: `first-class`, description: `First Class`, price: 500}],
  'transport': [{name: `private jet`, description: `Order a private jet`, price: 200}],
  'drive': [{name: `order personal driver`, description: `order personal driver`, price: 500}],
  'flight': [{name: `luxe-class`, description: `Switch to luxe class`, price: 100}, {name: `child-meal`, description: `Meal for kid`, price: 15}],
  'check-in': [{name: `breakfast`, description: `Add breakfast`, price: 50}],
  'sightseeing': [{name: `tickets`, description: `Book tickets`, price: 40}, {name: `lunch`, description: `Lunch in city`, price: 30}],
  'restaurant': [{name: `private table`, description: `Order private table`, price: 150}],
};

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
