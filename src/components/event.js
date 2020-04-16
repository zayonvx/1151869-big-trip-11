import {formatTime, formatTimeDiff} from "../utils.js";

const createOptionsList = (EVENT_OPTIONS) => {
  return EVENT_OPTIONS
    .map((it) => {
      const {option, cost} = it;
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${cost}</span>
        </li>`
      );
    }).slice(0, 3).join(`\n`);
};

export const createTripEventTemplate = (EVENTS) => {
  const {type, city, price, startDate, endDate, options} = EVENTS
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);
  const timeDiff = endDate - startDate;

  const isEventType = [`Check-in`, `Sightseeing`, `Restaurant`].some((it) => it === type) ? `in` : `to`;

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${isEventType} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T14:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T16:05">${endTime}</time>
        </p>
        <p class="event__duration">${formatTimeDiff(timeDiff)}</p>
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
