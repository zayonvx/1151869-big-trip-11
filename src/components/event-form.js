import {EVENT_TYPES, POINT_TYPES} from "../const.js";
import {formatDate, buildArray} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const createTypeMarkup = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
};

const createOptionsListForm = (options) => {
  return options
    .map((it) => {
      const {option, cost} = it;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option[options.length - 1]}-1" type="checkbox" name="event-offer-${option[options.length - 1]}" checked>
          <label class="event__offer-label" for="event-offer-${option[options.length - 1]}-1">
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


const createEventFormTemplate = (event, isNewEvent = true, changes) => {
  const {type, city, price, startDate, endDate, options, info, isFavorite} = event;
  const {newEvent} = changes;
  const newOptions = options[newEvent];
  const optionMarkup = isNewEvent ? createOptionsListFrom(newOptions) : createOptionsListForm(options);
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

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? isFavorite : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
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

export default class EventFormComponent extends AbstractSmartComponent {
  constructor(event, isNewEvent = true) {
    super();

    this._event = event;
    this._isNewEvent = isNewEvent;

    this._newEvent = null;
    this._submitHandler = null;
    this._addToFavoritesHandler = null;

    this._subscribeOnEvent();
  }

  recoveryListeners() {
    this.setFormSubmitHandler(this._submitHandler);
    this.setAddToFavoritesHandler(this._addToFavoritesHandler);
    this._subscribeOnEvent();
  }

  rerender() {
    super.rerender();

    this.recoveryListeners();
  }

  getTempate() {
    return createEventFormTemplate(this._event, this._isNewEvent, {newEvent: this._newEvent});
  }

  setFormSubmitHandler(cb) {
    this.getElement().addEventListener(`submit`, cb);
  }

  setAddToFavoritesHandler(cb) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, cb);
  }

  _subscribeOnEvent() {
    const eventTypeListContainer = this.getElement().querySelector(`.event__type-list`);

    eventTypeListContainer.addEventListener(`change`, (evt) => {
      this._newEvent = evt.target.value;
      this.rerender();
    });
  }
}
