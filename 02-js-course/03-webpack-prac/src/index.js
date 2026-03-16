import {greeting} from "./greeting.js";
import "./styles.css";
import hootImage from "./hoot.JPG";

const image = document.createElement("img");
image.src = hootImage;

document.body.appendChild(image);

console.log(greeting);
