import {sortData} from "../const.js";
import {renderComponent, replace, remove, RenderPosition} from "../utils/render.js";
import SortComponent from "../components/sort.js";

export default class SortController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._sortActive = sortData.EVENT;
    this._sortComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const sorts = Object.keys(sortData).map((sortType) => {
      return {
        name: sortData[sortType],
        isChecked: sortData[sortType] === this._sortActive,
      };
    });

    const oldComponent = this._sortComponent;

    this._sortComponent = new SortComponent(sorts);
    this._sortComponent.setSortChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      renderComponent(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    }
  }

  setDefaultView() {
    this._sortActive = sortData.EVENT;
    this._pointsModel.setSort(this._activeSort);
    this.render();
  }

  _onSortChange(sortType) {
    this._pointsModel.setSort(sortType);
    this._sortActive = sortType;
  }

  _onDataChange() {
    this.render();
  }

  kill() {
    remove(this._sortComponent);
    this._sortActive = sortData.EVENT;
    this._sortComponent = null;
  }
}
