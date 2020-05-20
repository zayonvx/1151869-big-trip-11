import AbstractComponent from "./abstract-component";

const createTripDaysWrapper = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayWrapperComponent extends AbstractComponent {
  getTemplate() {
    return createTripDaysWrapper();
  }

  clearContainer() {
    this.getElement().innerHTML = ``;
  }
}
