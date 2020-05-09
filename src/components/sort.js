import AbstractComponent from "./abstract-component";
import {sortData} from "../const.js";

const sortTemplate = (sortFilters) => sortFilters.map(({name, isChecked}) => {
  const nameLower = name.toLowerCase();
  return (
    `<div class="trip-sort__item  trip-sort__item--${nameLower}">
    <input id="sort-${nameLower}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLower})}" ${isChecked ? `checked` : ``}>
    <label class="trip-sort__btn" for="sort-${nameLower}">
      ${name}
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>`
  );
}).join(`\n`);

const createSortTemplate = (name, isChecked) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${sortTemplate(name, isChecked)}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortComponent extends AbstractComponent {
  constructor(sortFilters) {
    super();
    this._sortFilters = sortFilters;
    this._currentSortType = sortData.EVENT;
  }

  getTempate() {
    return createSortTemplate(this._sortFilters);
  }

  setOnSortClick(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.className !== `trip-sort__btn`) {
        return;
      }

      const sortType = evt.target.getAttribute(`for`).slice(5);

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
