import  css  from "bundle-text:./dice.css";
import go from "url:../assets/image/go.png";

const template = document.createElement('template');
template.innerHTML = `
   <style>${css}</style>
   <div id="dice" >
      <img src=${go} alt="go">
    </div>
`;

export class Dice extends HTMLElement {
   private diceCurrentValue: number = 0;
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
