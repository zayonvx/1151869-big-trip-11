import PointController from "./point.js";
import DayWrapperComponent from "../components/days-wrapper.js";
import SortComponent from "../components/sort.js";
import TripDaysComponent from "../components/day.js";
import {renderComponent, RenderPosition} from "../utils/render.js";
import {buildUniqueArray} from "../utils/common.js";
import {sortData} from "../const.js";
import {sortFilters} from "../mock/sort.js";

export default class TripController {
  constructor(container) {
    this._container = container;

    this._daysWrapper = new DayWrapperComponent();
    this._sortComponent = new SortComponent(sortFilters);

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {

    renderComponent(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    renderComponent(this._container, this._daysWrapper);

    this._events = events;

    this._daysNonUnique = this._events.map((event) => event.startDate.toDateString());

    this._days = buildUniqueArray(this._daysNonUnique);

    const renderEvents = (data, isSortDefault = true) => {
      const dayWrapperContainer = this._daysWrapper.getElement();
      if (isSortDefault) {
        [...this._days].forEach((day, index) => {
          const dayComponent = new TripDaysComponent(day, index);

          data.filter(({startDate}) => new Date(startDate).toDateString() === day).forEach((it) => {
            const eventContainer = dayComponent.getEventСontainer();
            const pointController = new PointController(eventContainer, this._onDataChange, this._onViewChange);
            pointController.render(it);
            this._showedPointControllers = this._showedPointControllers.concat(pointController);
          });

          renderComponent(dayWrapperContainer, dayComponent);
        });
      } else {
        const dayComponent = new TripDaysComponent();

        dayComponent.clearContainer();
        data.forEach((it) => {
          const eventContainer = dayComponent.getEventСontainer();
          const pointController = new PointController(eventContainer, this._onDataChange, this._onViewChange);
          pointController.render(it);
          this._showedPointControllers = this._showedPointControllers.concat(pointController);
        });
        renderComponent(dayWrapperContainer, dayComponent);
      }
    };

    renderEvents(this._events);

    this._sortComponent.setOnSortClick((sortType) => {
      let sortedEvents = [];
      let isSortDefault = true;

      switch (sortType) {
        case sortData.EVENT:
          isSortDefault = true;
          sortedEvents = this._events.slice();
          break;
        case sortData.TIME:
          isSortDefault = false;
          sortedEvents = this._events.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
          break;
        case sortData.PRICE:
          isSortDefault = false;
          sortedEvents = this._events.slice().sort((a, b) => b.price - a.price);
          break;
      }

      this._daysWrapper.clearContainer();
      renderEvents(sortedEvents, isSortDefault);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((event) => event === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((controller) => controller.setDefaultView());
  }
}
