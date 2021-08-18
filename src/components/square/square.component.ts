import css from "bundle-text:./square.css";

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>
   <div id="square" >
    </div>`;

export class SquareComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"}).appendChild(
            template.content.cloneNode(true));
    }

    set color(val: string) {
        if (val) {
            this.setAttribute("color", val);
        } else {
            this.removeAttribute("color");
        }
    }
}

customElements.define('sog-square', SquareComponent);
