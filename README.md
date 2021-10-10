### Démarrer le projet

1. `npm install`
2. `npm run start `

ℹ️ attention : la commande du script clean dans le package.json est écrite pour un système windows, il faut peut-être la
changer. (start lance un clean + build)

3. aller à localhost:1234

### Lancer les tests

1. `npm run test` lance les tests unitaires Jest

# web components

### Création

1. ajouter un fichier <nom component>.component.ts dans un répertoire src/<nom component>
2. créer un template

```ts
const template = document.createElement('template'); //cette ligne revient à ajouter <template></template>
template.innerHTML = `<div>
        html ici
    </div>
;
```

3. créer une classe HTMLElement pour le composant et attacher le template dans le shadow dom

```ts
class NomComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

}
```
ℹ le **shadow dom** (dom fantôme) permet d'isoler une hiérarchie d'éléments html (et son style), 
pour les placer dans la page ultérieurement en tant qu'enfants d'un élément html hôte dans le but 
de composer la page. Cela offre la possibilité de réutilisation du code.

Les éléments et style du template sont clonés dans le shadow dom dans le constructeur. Le template est déclaré 
en dehors du constructeur pour éviter le coût de le parser à chaque instanciation du composant. 

Il existe un mode d'encapsulation ouvert `{mode: "open"}` et un fermé, qui contrôle possibilité de manipuler
le dom fantôme avec du javascript ou non. La pratique la plus courante est de laisser le mode ouvert. 

4. définir le custom-element (= future balise html custom)

```ts
customElements.define('new-component', NomComponent);
```

ℹ dans cet exemple

* new-component sera le nom de la balise
* le préfixe est new
* il faut un nom de balise avec un préfixe (sinon pas valide)

5. ne pas oublier de l'exporter pour l'utiliser dans d'autres fichiers

```ts
export class NomComponent extends HTMLElement {
\\...
}
```


6. importer le composant
    * dans un .html

```html

<script src="src/components/NomComponent/NomComponent.component.ts"></script>

<new-component></new-component>
```

* ou dans un autre composant dans son template

```ts
export {NomComponent} from "../NomComponent/NomComponent.component";

const template = document.createElement('template');
template.innerHTML = `
   <div>
        <new-component></new-component>  
    </div>
`;

export class OtherComponent extends HTMLElement {
    // ...
}
```

(cela peut être fait de manière dynamique)

### Ajouter du style

Il est important que le style soit inclus dans le composant.
Voici la manière de faire dans ce projet :

1. créer une feuille de style externe par composant ex. nom-component.css
2. l'importer dans le .ts du component

```ts
   import css from "bundle-text:./nom-component.css";
```

3. l'importer dans le template du component

```ts
   const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div>
        <new-component></new-component>  
    </div>
`;
```

### Communication entre composants

#### avec des arguments

Prenons l'exemple du composant "carré" suivant. Nous voulons que le composant puisse aussi bien donner un carré rouge
que jaune.

```ts
const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host([color='red']) #square {
       background-color: red;
    }
    
    :host([color='yellow']) #square  {
        background-color: yellow;
    }
    </style>
    <div id="square" color="">
    </div>
`;

export class SquareComponent extends HTMLElement {
    // ...

}

customElements.define('sog-square', SquareComponent);
```

1. définir un attribut color (chaine de caractère uniquement) à notre balise custom

```ts
export class SquareComponent extends HTMLElement {

    set color(val: string) {
        if (val) {
            this.setAttribute("color", val);
        } else {
            this.removeAttribute("color");
        }
    }

}
```

2. l'utiliser ainsi

```html

<square color="red">
    <square> // carré rouge
        <square color="jaune">
            <square> // carré jaune
```

3. il est possible d'observer les changements de valeur d'un attribut

* ajouter ceci
```ts
export class SquareComponent extends HTMLElement {

    static get observedAttributes() {
        return ['color'];
    }

}
```

* et ajouter une action ici
```ts
export class SquareComponent extends HTMLElement {

    // est déclenché en cas de changement de valeur d'un attribut
    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'color':
                console.log('la nouvelle valeur est ', newValue);
                console.log('l\'ancienne valeur est ', oldValue);
                break;
        }
    }
}
```

#### avec des événements

Prenons l'exemple du composant "panneau de contrôle" suivant, Son template comporte un bouton "Rejouer" que l'on peut
cliquer.

```ts
const template = document.createElement('template');
template.innerHTML = `
   <div id="control-panel">
       <button id="restart">Rejouer</button>
    </div>
`;

export class ControlPanelComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

}

customElements.define('sog-control-panel', ControlPanelComponent);
```

1. créer un getter du bouton qui est dans le shadow dom du composant

```ts
export class ControlPanelComponent extends HTMLElement {
    //...
    private get restartButton() {
        return this.shadowRoot.getElementById("restart"); //le bouton a id="restart"
    }

    //...
}

```

2. ajouter un eventListener pour écouter le clic du bouton

```ts
export class ControlPanelComponent extends HTMLElement {
//...
    // cette méthode est appelée automatiquement à l'insertion du composant dans le dom
    connectedCallback() {

        //  this.restartButton = le getter créé à l'étape 1
        this.restartButton.addEventListener("click", (e: CustomEvent) => {
            // ...

        });
    }
}
```

3. lancer un événement custom plus explicite dont l'origine est le composant "panneau de contrôle" et non plus le bouton

```ts

this.restartButton.addEventListener("click", (e: CustomEvent) => {
    // dispatchEvent envoie un nouvel événement RESTART_CLICKED
    this.dispatchEvent(new CustomEvent('RESTART_CLICKED'));

}
```

4. écouter l'événement dans un autre composant

S'il existe un composant "game" qui contient un "panneau de contrôle"

```ts
const template = document.createElement('template');
template.innerHTML = `
   <div id="game">
       <sog-control-panel></sog-control-panel>
    </div>
`;

export class GameComponent extends HTMLElement {
    constructor() {
        //...
    }

    // getter du panneau de controle
    private get controlPanel() {
        return this.shadowRoot.getElementsByTagName("sog-control-panel").item(0);
    }

    connectedCallback() {
        // écoute l'événement RESTART_CLICKED sur l'élément qui en est la source
        this.controlPanel.addEventListener("RESTART_CLICKED", (e: CustomEvent) => {
            // faire une action ici
            this.game.restart();
        });
    }

}
```

6. il est possible d'envoyer des valeurs

```ts
    this.dispatchEvent(new CustomEvent<{ 'par': string }>('RESTART_CLICKED'), {detail: {'par': 'user 1'}});
```

et de les recevoir

```ts
this.controlPanel.addEventListener("RESTART_CLICKED", (e: CustomEvent<{ 'par': string }>) => {
    // e.detail.par vaut 'user 1'
}
```
