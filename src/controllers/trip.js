import SortComponent from "../components/sort.js";
import TripComponent from "../components/trip.js";
import CostComponent from "../components/cost.js";
import TripEventComponent from "../components/event.js";
import EventFormComponent from "../components/event-form.js";
import TripDaysComponent from "../components/day.js";
import DaysWrapperComponent from "../components/days-wrapper.js";
import MenuComponent from "../components/menu.js";
import FilterComponent from "../components/filter.js";
import {mathTotalPrice, buildCitiesString} from "../utils/common.js";
import {renderComponent, RenderPosition, replace} from "../utils/render.js";


const renderHeader = (events, days, tripMain) => {
  const totalCost = mathTotalPrice(events);
  const tripRoute = buildCitiesString(events);

  renderComponent(tripMain, new TripComponent(tripRoute, days), RenderPosition.AFTERBEGIN);

  const tripInfo = tripMain.querySelector(`.trip-info`);
  renderComponent(tripInfo, new CostComponent(totalCost));
};

const renderEvent = (eventContainer, event) => {
  const eventComponent = new TripEventComponent(event);
  const eventFormComponent = new EventFormComponent(event);

  const openEventForm = () => {
    replace(eventFormComponent, eventComponent);
  };

  const closeEventForm = () => {
    replace(eventComponent, eventFormComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeEventForm();
    }
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  eventComponent.setMoreButtonHandler(() => {
    openEventForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventFormComponent.setFormSubmitHandler(() => {
    closeEventForm();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderComponent(eventContainer, eventComponent);
};

const renderDay = (dayWrapper, day, events, index) => {
  const tripDayComponent = new TripDaysComponent(day, index);
  renderComponent(dayWrapper, tripDayComponent);
  const tripEventsList = dayWrapper.querySelectorAll(`.trip-events__list`);
  for (let j = 0; j < tripEventsList.length; j++) {
    for (let i = 0; i < events.length; i++) {
      renderEvent(tripEventsList[j], events[i]);
    }
  }
};

export default class TripController {
  constructor(events, days) {
    this._events = events;
    this._days = days;
    this._menu = new MenuComponent();
    this._filter = new FilterComponent();
    this._sort = new SortComponent();
    this._daysWrapper = new DaysWrapperComponent();
  }

  render() {
    const tripMain = document.querySelector(`.trip-main`);

    renderHeader(this._events, this._days, tripMain);

    const tripMenu = tripMain.querySelector(`.trip-controls`);
    renderComponent(tripMenu, this._menu);
    renderComponent(tripMenu, this._filter);

    const pageMain = document.querySelector(`.page-main`);
    const tripEvent = pageMain.querySelector(`.trip-events`);
    renderComponent(tripEvent, this._sort);
    renderComponent(tripEvent, this._daysWrapper);

    const dayWrapperElement = pageMain.querySelector(`.trip-days`);
    this._days.slice(0, this._days.length).forEach((day, index) => {
      renderDay(dayWrapperElement, day, this._events, index);
    });
  }
}
