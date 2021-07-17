import  css  from "bundle-text:./dice.css";

const template = document.createElement('template');
template.innerHTML = `
   <style>${css}</style>
   <div id="dice" >
        ceci est un dé
    </div>
`;

export class Dice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

    connectedCallback() {
        console.log("when attached to the dom");
    }
}

customElements.define('sog-dice', Dice);
