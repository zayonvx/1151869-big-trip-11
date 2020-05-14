import AbstractComponent from "./abstract-component";

const createTripDaysWrapper = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayWrapperComponent extends AbstractComponent {
  getTempate() {
    return createTripDaysWrapper();
  }

  clearContainer() {
    return this.getElement().innerHTML = ``;
  }
}
