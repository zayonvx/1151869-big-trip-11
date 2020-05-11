import DayWrapperComponent from "../components/days-wrapper.js";
import SortComponent from "../components/sort.js";
import TripEventComponent from "../components/event.js";
import EventFormComponent from "../components/event-form.js";
import {renderComponent, replace, RenderPosition} from "../utils/render.js";
import TripDaysComponent from "../components/day.js";
import {sortData} from "../const.js";
import {sortFilters} from "../mock/sort.js";
import {buildUniqueArray} from "../utils/common.js";

export default class TripController {
  constructor(container) {
    this._container = container;

    this._daysWrapper = new DayWrapperComponent();
    this._sortComponent = new SortComponent(sortFilters);
  }

  render(events) {
    const renderEvent = (event, day) => {
      const eventComponent = new TripEventComponent(event);
      const eventFormComponent = new EventFormComponent(event);
      const eventContainer = day.getSelector(`.trip-events__list`);

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

    renderComponent(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    renderComponent(this._container, this._daysWrapper);

    this._events = events;

    this._daysNonUnique = this._events.map((event) => event.startDate.toDateString());

    this._days = buildUniqueArray(this._daysNonUnique);

    console.log(this._days);

    const renderEvents = (data, isSortDefault = true) => {
      const dayWrapperContainer = this._daysWrapper.getElement();
      if (isSortDefault) {
        [...this._days].forEach((day, index) => {
          const dayComponent = new TripDaysComponent(day, index);

          data.filter(({startDate}) => new Date(startDate).toDateString() === day).forEach((it) => {
            renderEvent(it, dayComponent);
          });

          renderComponent(dayWrapperContainer, dayComponent);
        });
      } else {
        const dayComponent = new TripDaysComponent();

        dayComponent.getSelector(`.day__info`).innerHTML = ``;
        data.forEach((it) => renderEvent(it, dayComponent));
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

      this._daysWrapper.getElement().innerHTML = ``;
      renderEvents(sortedEvents, isSortDefault);
    });
  }
}
