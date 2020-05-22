import TripEventComponent from "../components/event.js";
import EventFormComponent from "../components/event-form.js";
import {renderComponent, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  CREATE: `create`,
};

export const EmptyEvent = {
  id: String(new Date() + Math.random()),
  type: `train`,
  city: ``,
  options: [],
  info: {
    description: ` `,
    photos: [],
  },
  price: ``,
  startDate: new Date(),
  endDate: new Date(),
  isFavorite: false,
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

  render(event, mode) {
    this._mode = mode;

    const oldEventComponent = this._eventComponent;
    const oldEventFormComponent = this._eventFormComponent;

    this._eventComponent = new TripEventComponent(event);
    this._eventFormComponent = new EventFormComponent(event, this._mode);

    this._eventComponent.setMoreButtonHandler(() => {
      this._openEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setResetButtonHandler(() => {
      this._onDataChange(this, event, null);
    });

    this._eventFormComponent.setFormSubmitHandler(() => {
      const data = this._eventFormComponent.getData();
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent.setAddToFavoritesHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {isFavorite: !event.isFavorite}));
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventFormComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventFormComponent, oldEventFormComponent);
          this._closeEventForm();
        } else {
          renderComponent(this._container, this._eventComponent);
        }
        break;
      case Mode.CREATE:
        if (oldEventFormComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventFormComponent);
        }
        renderComponent(this._container, this._eventFormComponent, RenderPosition.AFTERBEGIN);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        break;
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
      if (this._mode === Mode.CREATE) {
        this._onDataChange(this, event, null);
      }
      this._closeEventForm();
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeEventForm();
    }
  }

  kill() {
    remove(this._eventComponent);
    remove(this._eventFormComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
