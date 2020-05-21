import AbstractSmartComponent from "./abstract-component.js";
import {filterData} from "../const.js";

const createFilterMarkup = (filters) => filters.map(({name, isChecked}) => {
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label></div>`
  );
}).join(`\n`);

const createFilterTemplate = (name, isChecked) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFilterMarkup(name, isChecked)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterComponent extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._filterActive = filterData.EVERYTHING;
    this._filterChangeHandler = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterType = evt.target.value;
      handler(filterType);
    });
  }
}

