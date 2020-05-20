import {filterData} from "../const.js";
import {getFilteredEvents} from "../utils/filter.js";

export default class PointsModel {
  constructor() {
    this._events = [];

    this._filterActive = filterData.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    const filteredEvents = getFilteredEvents(this._events, this._filterActive);

    return filteredEvents;
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
