
import {EVENTS} from "./mock/trip.js";
import {DAYS} from "./mock/days.js";
import TripController from "./controllers/trip.js";

const trip = new TripController(EVENTS, DAYS);

trip.render();
