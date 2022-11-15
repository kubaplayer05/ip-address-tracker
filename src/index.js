import * as utils from "./utils.js";

const btn = document.querySelector(".btn");

btn.addEventListener("click", utils.getLocation);

utils.initial();
