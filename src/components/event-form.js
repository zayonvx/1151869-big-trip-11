import {EVENT_TYPES, POINT_TYPES} from "../const.js";
import {formatDate, buildArray} from "../utils.js";

const createTypeMarkup = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
};

const createOptionsListForm = (EVENT_OPTIONS) => {
  return EVENT_OPTIONS
    .map((it) => {
      const {option, cost} = it;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option[EVENT_OPTIONS.length - 1]}-1" type="checkbox" name="event-offer-${option[EVENT_OPTIONS.length - 1]}" checked>
          <label class="event__offer-label" for="event-offer-${option[EVENT_OPTIONS.length - 1]}-1">
            <span class="event__offer-title">${option}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${cost}</span>
          </label>
        </div>`
      );
    }).slice(0, 3).join(`\n`);
};

const createPhoto = (url) => {
  return (
    `<div class="event__photos-tape">
      <img class="event__photo" src="${url}" alt="Event photo">
    </div>`
  );
};


export const createEventFormTemplate = (EVENT) => {
  const {type, city, price, startDate, endDate, options, info} = EVENT;
  const optionMarkup = createOptionsListForm(options);
  const typeMarkupTransport = EVENT_TYPES.map((it) => createTypeMarkup(it)).join(`\n`);
  const typeMarkupPoint = POINT_TYPES.map((it) => createTypeMarkup(it)).join(`\n`);
  const descriptionText = buildArray(info.description);
  const photosMarkup = info.photos.map((it) => createPhoto(it)).join(`\n`);
  const startTime = formatDate(startDate);
  const endTime = formatDate(endDate);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type.toLowerCase() : ``}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${typeMarkupTransport}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${typeMarkupPoint}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type ? type : ``} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city ? city : ``}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime ? startTime : `18/03/19 00:00`}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime ? endTime : `18/03/19 00:00`}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${optionMarkup}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${descriptionText}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${photosMarkup}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
