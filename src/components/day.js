const createTripDayMarkup = (it, index) => {
  return (
    `<li class="trip-days__item  day">
         <div class="day__info">
           <span class="day__counter">${index + 1}</span>
           <time class="day__date" datetime="2019-03-18">${it.month} ${it.number}</time>
         </div>
         <ul class="trip-events__list"> </ul>
    </li>`
  );
};

export const createTripDaysTemplate = (days) => {
  const TripDayItem = days.map((it, index) => createTripDayMarkup(it, index)).join(`\n`);
  return (
    `${TripDayItem}`
  );
};
