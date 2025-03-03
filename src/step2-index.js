import WebController from "./controller/WebController.js";
import EventHandler from "./handler/EventHandler.js";

const controller = new WebController();

new EventHandler(controller);
controller.init();
