import AbstractComponent from "./abstract-component";
import {getTripInfoTitle, getTripInfoDates} from "../utils/common.js";
const createTripTemplate = (events) => {
  const title = getTripInfoTitle(events);
  const dates = getTripInfoDates(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
    </section>`
  );
};

export default class TripComponent extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripTemplate(this._events);
  }
}
