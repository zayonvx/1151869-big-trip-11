import AbstractComponent from "./abstract-component";

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

export default class TripDaysComponent extends AbstractComponent {
  constructor(day, index) {
    super();

    this._day = day;

    this._index = index;
  }

  getTempate() {
    return createTripDaysTemplate(this._day, this._index)
  }
};
