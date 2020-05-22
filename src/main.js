import TripInfoComponent from "./components/trip-info.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import PointsModel from "./models/points.js";
import {generateEvents, EVENTS_COUNT} from "./mock/trip.js";
import {renderComponent, RenderPosition} from "./utils/render.js";
import TripController from "./controllers/trip.js";

const events = generateEvents(EVENTS_COUNT).slice().sort((a, b) => a.startDate.getMonth() - b.startDate.getMonth());

const pointsModel = new PointsModel();
pointsModel.setEvents(events);

const tripMain = document.querySelector(`.trip-main`);

renderComponent(tripMain, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector(`.trip-info`);
renderComponent(tripInfo, new CostComponent(events));

const tripMenu = tripMain.querySelector(`.trip-controls`);

renderComponent(tripMenu, new MenuComponent());

const tripContainer = document.querySelector(`.trip-events`);

const tripController = new TripController(tripContainer, pointsModel);
tripController.render();
