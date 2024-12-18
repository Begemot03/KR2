import Presenter from "./presenter/Presenter.js";
import H1Component from "./view/h1Component.js";

const app = document.querySelector(".container");

const h1 = new H1Component({ container: app });

const presenter = new Presenter({ container: app });
