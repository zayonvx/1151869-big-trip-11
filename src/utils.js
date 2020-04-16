const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getRandomLengthArray = (min, max) => {
  return new Array(getRandomNumber(min, max))
    .fill(``);
};

const getRandomDate = (date) => {
  const targetDate = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 2);
  const diffMinutes = getRandomIntegerNumber(0, 60);

  targetDate.setDate(targetDate.getDate() + diffDays);
  targetDate.setMinutes(targetDate.getMinutes() + diffMinutes);

  return targetDate;
};

const displayTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date, forForm = false) => {
  const years = displayTimeFormat(date.getUTCFullYear()) % 2000;
  const months = displayTimeFormat(date.getMonth());
  const days = displayTimeFormat(date.getDate());
  const hours = displayTimeFormat(date.getHours() % 12);
  const minutes = displayTimeFormat(date.getMinutes());

  return forForm ? `${days}/${months}/${years} ${hours}:${minutes}` : `${hours}:${minutes}`;
};

const formatTimeDiff = (timeDiff) => {
  const time = Math.floor((timeDiff) / 60000);
  const minutes = time % 60;
  const days = Math.round((time - minutes) / 1440);
  const hours = Math.round((time - minutes) / 60 - days * 24);

  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`;
};

const getHeader = (events) => {
  return events.length <= 3 ? events.map((event) => event.city).join(` — `) : `${events[0].city} — ... — ${events[events.length - 1].city}`;
};


export {getRandomIntegerNumber, getRandomArrayItem, getRandomBoolean, getRandomLengthArray, getRandomDate, formatTime, formatTimeDiff, getHeader};
