export const createCostTemplate = (fullCost) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
    </p>`
  );
};
