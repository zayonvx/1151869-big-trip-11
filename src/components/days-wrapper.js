import {createElement} from "../utils";

const createTripDaysWrapper = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayWrapperComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysWrapper();
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
