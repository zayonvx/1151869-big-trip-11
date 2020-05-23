import {filterData} from "../const.js";
import moment from 'moment';

export const getFilteredEvents = (events, filterType) => {
  const today = moment();
  let filteredEvents = [];

  switch (filterType) {
    case filterData.EVERYTHING:
      filteredEvents = events;
      break;
    case filterData.FUTURE:
      filteredEvents = events.filter((event) => event.startDate > today);
      break;
    case filterData.PAST:
      filteredEvents = events.filter((event) => event.startDate < today);
      break;
  }

  return filteredEvents;
};
