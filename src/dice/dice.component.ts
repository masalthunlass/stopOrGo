import  css  from "bundle-text:./dice.css";
import go from "url:../assets/image/go.png";
import one from "url:../assets/image/one.png";
import two from "url:../assets/image/two.png";
import three from "url:../assets/image/three.png";
import four from "url:../assets/image/four.png";
import five from "url:../assets/image/five.png";
import six from "url:../assets/image/six.png";

const diceImgMapping = [ go, one, two, three, four, five, six];

const template = document.createElement('template');
template.innerHTML = `
   <style>${css}</style>
   <div id="dice" >
      <img id="dice-img" src=${go} alt="go">
    </div>
`;


export class Dice extends HTMLElement {
   private diceCurrentValue: number = 0;

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['src'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'src':
                console.log(`Value changed from ${oldValue} to ${newValue}`);
                break;
        }
    }

    connectedCallback() {
        this.addEventListener("click",  (e)  => {
            this.roll();
        });
    }

    private setDiceImg(diceImgMappingElement: string = go) {
        this.shadowRoot.getElementById("dice-img").setAttribute("src", diceImgMappingElement);
    }

    private roll(): void {
        this.diceCurrentValue = Math.floor(Math.random() * 6) + 1;
        this.setDiceImg(diceImgMapping[this.diceCurrentValue]);
    }
}

customElements.define('sog-dice', Dice);
