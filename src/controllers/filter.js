import FilterComponent from "../components/filter.js";
import {filterData} from "../const.js";
import {renderComponent, replace} from "../utils/render.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterActive = filterData.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const filters = Object.keys(filterData).map((filterType) => {
      return {
        name: filterData[filterType],
        isChecked: filterData[filterType] === this._filterActive,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderComponent(container, this._filterComponent);
    }
  }

  setDefaultView() {
    this._filterActive = filterData.EVERYTHING;
    this.render();
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._filterActive = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
