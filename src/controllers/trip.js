import PointController, {Mode, EmptyEvent} from "./point.js";
import DayWrapperComponent from "../components/days-wrapper.js";
import TripDaysComponent from "../components/day.js";
import {renderComponent, remove} from "../utils/render.js";
import {buildUniqueArray} from "../utils/common.js";
import NoEventsComponent from "../components/no-events.js";
import SortController from "./sort.js";
import FilterController from "./filter.js";
export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._daysWrapper = new DayWrapperComponent();

    this._showedPointControllers = [];
    this._showedTripDaysComponents = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._pointsModel.setSortChangeHandler(this._onSortChange);


    this._createSortController();
    this._createFiltersController();

    this._setAddEventButtonHandler();
  }

  render() {
    const events = this._pointsModel.getEvents();
    renderComponent(this._container, this._daysWrapper);
    this._renderEvents(events);
  }

  createEvent() {
    if (this._newEvent) {
      return;
    }
    this._sortController.kill();
    this._filterController.setDefaultView();
    this._onViewChange();

    const tripEventsElement = document.querySelector(`.trip-events`);

    this._newEvent = new PointController(tripEventsElement, this._onDataChange, this._onViewChange);
    this._newEvent.render(EmptyEvent, Mode.CREATE);
    this._sortController.render();
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
          pointController.render(it, Mode.DEFAULT);
          this._showedPointControllers = this._showedPointControllers.concat(pointController);
        });
        renderComponent(dayWrapperContainer, dayComponent);
        this._showedTripDaysComponents = this._showedTripDaysComponents.concat(dayComponent);
      });
    }
  }

  _onDataChange(pointController, oldData, newData) {
    if (newData === null) {
      this._newEvent = null;
      this._addEventButton.disabled = false;
      this._pointsModel.removeEvent(oldData.id);
      pointController.kill();
      this._updateEvents();
    } else if (newData) {
      if (this._newEvent) {
        this._newEvent = null;
        this._addEventButton.disabled = false;
        pointController.kill();
        this._pointsModel.addEvent(newData);
        this._updateEvents();
      } else {
        const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

        if (isSuccess) {
          pointController.render(newData, Mode.DEFAULT);
        }
      }
    }
  }

  _removeEvents() {
    this._showedPointControllers.forEach((pointController) => pointController.kill());
    this._showedPointControllers = [];
  }

  _removeTripDaysComponents() {
    this._showedTripDaysComponents.forEach((component) => remove(component));
    this._showedTripDaysComponents = [];
  }


  _onViewChange() {
    if (this._newEvent) {
      this._newEvent.kill();
      this._newEvent = null;
      this._addEventButton.disabled = false;
    }
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
    this._removeTripDaysComponents();
    this._renderEvents(this._pointsModel.getEvents());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onSortChange() {
    this._updateEvents();
  }

  _createSortController() {
    const tripEventsElement = document.querySelector(`.trip-events`);
    this._sortController = new SortController(tripEventsElement, this._pointsModel);
    this._sortController.render();
  }

  _createFiltersController() {
    const tripControlsElement = document.querySelector(`.trip-controls`);
    this._filterController = new FilterController(tripControlsElement, this._pointsModel);
    this._filterController.render();
  }

  _setAddEventButtonHandler() {
    this._addEventButton = document.querySelector(`.trip-main__event-add-btn`);
    this._addEventButton.addEventListener(`click`, (evt) => {
      evt.target.disabled = true;
      this.createEvent();
    });
  }
}
