import {formatDateDiff, formatDate} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createOptionsList = (options) => {
  return options
  .slice(0, options.length)
    .map((it) => {
      const {option, cost} = it;
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${cost}</span>
        </li>`
      );
    }).join(`\n`);
};

const createTripEventTemplate = (event) => {
  const {type, city, price, startDate, endDate, options} = event;
  const isEventType = [`Check-in`, `Sightseeing`, `Restaurant`].some((it) => it === type) ? `in` : `to`;

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${isEventType} ${city}</h3>

      <div class="event__schedule">
        <p class="event__Date">
          <time class="event__start-time" datetime="2019-03-18T14:30">${formatDate(startDate)}</Date>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T16:05">${formatDate(endDate)}</time>
        </p>
        <p class="event__duration">${formatDateDiff(startDate, endDate)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createOptionsList(options)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class TripEventComponent extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTempate() {
    return createTripEventTemplate(this._event);
  }
}
