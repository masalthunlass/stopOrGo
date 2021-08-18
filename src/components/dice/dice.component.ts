import css from "bundle-text:./dice.css";
import go from "url:../../assets/image/go.png";
import one from "url:../../assets/image/one.png";
import two from "url:../../assets/image/two.png";
import three from "url:../../assets/image/three.png";
import four from "url:../../assets/image/four.png";
import five from "url:../../assets/image/five.png";
import six from "url:../../assets/image/six.png";
import {Dice} from "../../model/Dice.model";

const diceImgMapping = [ go, one, two, three, four, five, six];

const template = document.createElement('template');
template.innerHTML = `
   <style>${css}</style>
   <div id="dice" >
      <img id="dice-img" src=${go} alt="go">
    </div>
`;

export class DiceComponent extends HTMLElement {

   private dice: Dice = new Dice();

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(template.content.cloneNode(true));
    }

    get diceImg() {
        return this.shadowRoot.getElementById("dice-img").getAttribute("src");
    }

    set diceImg(val: string) {
        if (val) {
            this.shadowRoot.getElementById("dice-img").setAttribute('src',  val);
        } else {
            this.shadowRoot.getElementById("dice-img").removeAttribute('src');
        }
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
            this.dice.roll();
            this.diceImg = diceImgMapping[this.dice.currentValue];
            this.dispatchEvent(new CustomEvent('DICE_VALUE_UPDATED', {detail: this.dice.currentValue} ))
        });
    }


}
customElements.define('sog-dice', DiceComponent);
