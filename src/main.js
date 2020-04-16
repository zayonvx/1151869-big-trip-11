import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sort.js";
import {createEventFormTemplate} from "./components/event-form.js";
import {createTripDaysWrapper} from "./components/days-wrapper.js";
import {createTripDaysTemplate} from "./components/day.js";
import {createTripEventTemplate} from "./components/event.js";
import {getHeader} from "./utils.js";
import {EVENTS} from "./mock/trip.js";
import {DAYS} from "./mock/days.js";

const EVENTS_COUNT = 20;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const TripMainElement = document.querySelector(`.trip-main`);
const TripMenuElement = TripMainElement.querySelector(`.trip-controls`);
const PageMainElement = document.querySelector(`.page-main`);
const TripEventElement = PageMainElement.querySelector(`.trip-events`);

render(TripMainElement, createTripTemplate(getHeader(EVENTS), DAYS), `afterbegin`);
const TripInfo = TripMainElement.querySelector(`.trip-info`);
render(TripInfo, createCostTemplate());

render(TripMenuElement, createMenuTemplate());
render(TripMenuElement, createFilterTemplate());
render(TripEventElement, createSortTemplate());
render(TripEventElement, createEventFormTemplate(EVENTS[0]));

render(TripEventElement, createTripDaysWrapper());
const TripDaysWrapper = TripEventElement.querySelector(`.trip-days`);
render(TripDaysWrapper, createTripDaysTemplate(DAYS));
const DayEventWrapper = TripDaysWrapper.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(DayEventWrapper, createTripEventTemplate(EVENTS[i]));
}

