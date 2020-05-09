import TripInfoComponent from "./components/trip-info.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import {EVENTS} from "./mock/trip.js";
import {renderComponent, RenderPosition} from "./utils/render.js";
import TripController from "./controllers/trip.js";

const tripMain = document.querySelector(`.trip-main`);

renderComponent(tripMain, new TripInfoComponent(EVENTS), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector(`.trip-info`);
renderComponent(tripInfo, new CostComponent(EVENTS));

const tripMenu = tripMain.querySelector(`.trip-controls`);

renderComponent(tripMenu, new MenuComponent());
renderComponent(tripMenu, new FilterComponent());


const tripContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(tripContainer);
tripController.render(EVENTS);
