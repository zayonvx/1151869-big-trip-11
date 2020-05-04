import SortComponent from "../components/sort.js";
import TripEventComponent from "../components/event.js";
import EventFormComponent from "../components/event-form.js";
import TripDaysComponent from "../components/day.js";
import DaysWrapperComponent from "../components/days-wrapper.js";
import {renderComponent, replace} from "../utils/render.js";

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sort = new SortComponent();
    this._daysWrapper = new DaysWrapperComponent();
  }

  render(events, days) {
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

    this._days = days;
    this._events = events;
    const pageMain = document.querySelector(`.page-main`);
    renderComponent(this._container, this._sort);
    renderComponent(this._container, this._daysWrapper);

    const dayWrapperElement = pageMain.querySelector(`.trip-days`);
    this._days.slice(0, this._days.length).forEach((day, index) => {
      renderDay(dayWrapperElement, day, this._events, index);
    });
  }
}
