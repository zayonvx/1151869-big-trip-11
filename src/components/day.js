import AbstractComponent from "./abstract-component";

const createTripDaysTemplate = (day, index) => {
  return (
    `<li class="trip-days__item  day">
         <div class="day__info">
           <span class="day__counter">${index + 1}</span>
           <time class="day__date" datetime="2019-03-18">${day}</time>
         </div>
         <ul class="trip-events__list"> </ul>
    </li>`
  );
};

export default class TripDaysComponent extends AbstractComponent {
  constructor(day, index) {
    super();

    this._index = index;

    this._day = day;
  }

  getTempate() {
    return createTripDaysTemplate(this._day, this._index);
  }

  getEventСontainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }

  clearContainer() {
    return this.getElement().querySelector(`.day__info`).innerHTML = ``;;
  }
}
