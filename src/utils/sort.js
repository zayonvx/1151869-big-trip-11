import {sortData} from "../const.js";

export const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];

  switch (sortType) {
    case sortData.EVENT:
      sortedEvents = events;
      break;
    case sortData.TIME:
      sortedEvents = events.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
    case sortData.PRICE:
      sortedEvents = events.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};
