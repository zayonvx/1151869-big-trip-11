import AbstractComponent from "./abstract-component.js";
import {getTripInfoPrice} from "../utils/common.js";

const createCostTemplate = (events) => {
  const fullCost = getTripInfoPrice(events);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
    </p>`
  );
};

export default class CostComponent extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createCostTemplate(this._events);
  }
}
