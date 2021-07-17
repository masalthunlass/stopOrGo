export { Dice } from "./src/dice/dice.component";

const template = document.createElement('template');
template.innerHTML = `<div>
        <h2>Stop Or Go ?</h2>
        <sog-dice></sog-dice>
    </div>
`;

export class Index extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }
}

customElements.define('sog-app', Index);
