import {filterData, sortData} from "../const.js";
import {getFilteredEvents} from "../utils/filter.js";
import {getSortedEvents} from "../utils/sort.js";

export default class PointsModel {
  constructor() {
    this._events = [];

    this._filterActive = filterData.EVERYTHING;
    this._sortActive = sortData.EVENT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getEvents() {
    const filteredEvents = getFilteredEvents(this._events, this._filterActive);
    const sortedEvents = getSortedEvents(filteredEvents, this._sortActive);
    return sortedEvents;
  }

  getEventsAll() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filter) {
    this._filterActive = filter;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSort(sort) {
    this._sortActive = sort;
    this._callHandlers(this._sortChangeHandlers);
  }

  addEvent(event) {
    this._events = [event, ...this._events];
    this._callHandlers(this._dataChangeHandlers);
  }

  removeEvent(id) {
    const index = this._events.findIndex((event) => event.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
