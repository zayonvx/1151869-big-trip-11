import AbstractComponent from "./abstract-component";

const createCostTemplate = (fullCost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
    </p>`
  );
};

export default class CostComponent extends AbstractComponent {
  constructor(fullCost) {
    super();

    this._fullCost = fullCost;
  }

  getTempate() {
    return createCostTemplate(this._fullCost);
  }
}
