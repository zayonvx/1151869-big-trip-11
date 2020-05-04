import TripComponent from "./components/trip.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import {EVENTS} from "./mock/trip.js";
import {DAYS} from "./mock/days.js";
import {renderComponent, RenderPosition} from "./utils/render.js";
import {mathTotalPrice, buildCitiesString} from "./utils/common.js";
import TripController from "./controllers/trip.js";

const renderHeader = (events, days) => {
  const tripMain = document.querySelector(`.trip-main`);

  const totalCost = mathTotalPrice(events);
  const tripRoute = buildCitiesString(events);

  renderComponent(tripMain, new TripComponent(tripRoute, days), RenderPosition.AFTERBEGIN);

  const tripInfo = tripMain.querySelector(`.trip-info`);
  renderComponent(tripInfo, new CostComponent(totalCost));

  const tripMenu = tripMain.querySelector(`.trip-controls`);

  renderComponent(tripMenu, new MenuComponent());
  renderComponent(tripMenu, new FilterComponent());
};

renderHeader(EVENTS, DAYS);

const tripContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(tripContainer);
tripController.render(EVENTS, DAYS);
