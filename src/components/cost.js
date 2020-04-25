import {createElement} from "../utils";

const createCostTemplate = (fullCost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
    </p>`
  );
};

export default class CostComponent {
  constructor(fullCost) {
    this._fullCost = fullCost;

    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._fullCost);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
