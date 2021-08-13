import css from "bundle-text:./dice.css";
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
console.log(template.innerHTML);


export class Dice extends HTMLElement {
   private _currentValue: number = 0;

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['src'];
    }

    get currentValue() {
      return this._currentValue;
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

    roll(): void {
        this._currentValue = Math.floor(Math.random() * 6) + 1;
        this.setDiceImg(diceImgMapping[this.currentValue]);
    }
}

customElements.define('sog-dice', Dice);
