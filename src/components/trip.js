export const createTripTemplate = (header, days) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${header}</h1>
        <p class="trip-info__dates">${days[0].month} ${days[0].number}&nbsp;&mdash;&nbsp;${days[days.length - 1].month} ${days[days.length - 1].number}</p>
      </div>
    </section>`
  );
};
