import TripComponent from "./components/trip.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import EventFormComponent from "./components/event-form.js";
import DaysWrapperComponent from "./components/days-wrapper.js";
import TripDaysComponent from "./components/day.js";
import TripEventComponent from "./components/event.js";
import {buildCitiesString, mathTotalPrice, render, RenderPosition} from "./utils.js";
import {EVENTS} from "./mock/trip.js";
import {DAYS} from "./mock/days.js";

const tripMainElement = document.querySelector(`.trip-main`);

const renderHeader = (events, days) => {
  const totalCost = mathTotalPrice(events);
  const tripRoute = buildCitiesString(events);

  render(tripMainElement, new TripComponent(tripRoute, days).getElement(), RenderPosition.AFTERBEGIN);

  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new CostComponent(totalCost).getElement());
};

const renderEvent = (eventContainer, event) => {
  const eventComponent = new TripEventComponent(event);
  const eventFormComponent = new EventFormComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventRollUpBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const eventFormRollUpBtn = eventFormComponent.getElement().querySelector(`.event__save-btn`);

  const replaceFormToEvent = () => {
    eventContainer.replaceChild(eventComponent.getElement(), eventFormComponent.getElement());
  };

  const replaceEventToForm = () => {
    eventContainer.replaceChild(eventFormComponent.getElement(), eventComponent.getElement());
  };

  eventRollUpBtn.addEventListener(`click`, function () {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventFormRollUpBtn.addEventListener(`click`, function () {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventContainer, eventComponent.getElement());
};

const renderDay = (dayWrapper, day, events, index) => {
  const tripDayComponent = new TripDaysComponent(day, index);
  render(dayWrapper, tripDayComponent.getElement());
  const tripEventsList = dayWrapper.querySelectorAll(`.trip-events__list`);
  for (let j = 0; j < tripEventsList.length; j++) {
    for (let i = 0; i < events.length; i++) {
      renderEvent(tripEventsList[j], events[i]);
    }
  }
};


const renderPage = (events, days) => {
  renderHeader(events, days);
  const pageMainElement = document.querySelector(`.page-main`);

  const tripMenuElement = tripMainElement.querySelector(`.trip-controls`);
  render(tripMenuElement, new MenuComponent().getElement());
  render(tripMenuElement, new FilterComponent().getElement());

  const tripEventElement = pageMainElement.querySelector(`.trip-events`);
  render(tripEventElement, new SortComponent().getElement());
  render(tripEventElement, new DaysWrapperComponent().getElement());

  const dayWrapper = pageMainElement.querySelector(`.trip-days`);
  days.slice(0, days.length).forEach((day, index) => {
    renderDay(dayWrapper, day, events, index);
  });
};

renderPage(EVENTS, DAYS);
