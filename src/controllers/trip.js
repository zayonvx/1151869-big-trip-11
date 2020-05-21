import PointController from "./point.js";
import DayWrapperComponent from "../components/days-wrapper.js";
import TripDaysComponent from "../components/day.js";
import {renderComponent, remove} from "../utils/render.js";
import {buildUniqueArray} from "../utils/common.js";
import NoEventsComponent from "../components/no-events.js";
export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._daysWrapper = new DayWrapperComponent();

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._pointsModel.setSortChangeHandler(this._onSortChange);
  }

  render() {
    const events = this._pointsModel.getEvents();

    renderComponent(this._container, this._daysWrapper);

    this._renderEvents(events);
  }

  _renderEvents(data) {

    this._daysNonUnique = data.map((dataItem) => dataItem.startDate.toDateString());
    this._days = buildUniqueArray(this._daysNonUnique);

    const dayWrapperContainer = this._daysWrapper.getElement();

    if (data.length === 0) {
      this._noEventsComponent = new NoEventsComponent();
      renderComponent(this._container, this._noEventsComponent);
    } else {
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
    }
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _removeEvents() {
    this._showedPointControllers.forEach((pointController) => pointController.kill());
    this._showedPointControllers = [];
    this._daysWrapper.clearContainer();
  }


  _onViewChange() {
    this._showedPointControllers.forEach((controller) => controller.setDefaultView());
  }


  _removeNoEventsComponent() {
    if (this._noEventsComponent) {
      remove(this._noEventsComponent);
    }
  }

  _updateEvents() {
    this._removeEvents();
    this._removeNoEventsComponent();
    this._renderEvents(this._pointsModel.getEvents());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onSortChange() {
    this._updateEvents();
  }
}
