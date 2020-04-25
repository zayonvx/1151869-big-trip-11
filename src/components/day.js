import {createElement} from "../utils";

const createTripDaysTemplate = (day, index) => {
  const {month, number} = day;
  return (
    `<li class="trip-days__item  day">
         <div class="day__info">
           <span class="day__counter">${index + 1}</span>
           <time class="day__date" datetime="2019-03-18">${month} ${number}</time>
         </div>
         <ul class="trip-events__list"> </ul>
    </li>`
  );
};

export default class TripDaysComponent {
  constructor(day, index) {
    this._day = day;

    this._index = index;

    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate(this._day, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
