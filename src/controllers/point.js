import TripEventComponent from "../components/event.js";
import EventFormComponent from "../components/event-form.js";
import {renderComponent, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventComponent = null;
    this._eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
  }

  render(event) {

    const oldEventComponent = this._eventComponent;
    const oldEventFormComponent = this._eventFormComponent;

    this._eventComponent = new TripEventComponent(event);
    this._eventFormComponent = new EventFormComponent(event, false);

    this._eventComponent.setMoreButtonHandler(() => {
      this._openEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setFormSubmitHandler(() => {
      this._closeEventForm();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setAddToFavoritesHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {isFavorite: !event.isFavorite}));
    });

    if (oldEventFormComponent && oldEventFormComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventFormComponent, oldEventFormComponent);
    } else {
      renderComponent(this._container, this._eventComponent);
    }
  }

  _openEventForm() {
    this._onViewChange();
    replace(this._eventFormComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _closeEventForm() {
    replace(this._eventComponent, this._eventFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeEventForm();
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeEventForm();
    }
  }
}
