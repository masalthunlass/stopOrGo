# Démarrer le projet

1. npm init
2. ajouter typescript (npm install + (tsconfig.json + répertoire dist / ou bien tsc --init))
3. ajouter un bundler Parcel ``npm install -g parcel-bundler``
       ajouter index.html + app.js
```html
<html>
    <body>
         <script src="./app.js"></script>
    </body>
</html>
```

4. npm install --save-dev jest
5. package.json script test jest
6. ajouter babel (npm install + preset)
```json
   {
  "name": "stoporgo",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "clean": "rm dist/bundle.js",
    "build-prod": "parcel build index.html",
    "start": "parcel index.html",
    "test": "jest"
  },
  "author": "masalthunlass",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.14.6",  
    "@babel/preset-env": "^7.14.7",
    "babel-jest": "^27.0.6",
    "jest": "^27.0.6",
    "parcel-bundler": "^1.12.5",
    "typescript": "^4.3.5"
  }
}

   ```
7. npm install npm start go localhost:1234

# Créer un web component
1. ajouter un fichier dice.component.ts dans src/dice
2. créer un template 
```ts
const template = document.createElement('template');
template.innerHTML = `<div>
        ceci est un dé
    </div>
;
```

3. créer une classe HTMLElement pour le composant et attacher le template dans le shadow dom
```ts
class Dice extends HTMLElement {
       constructor() {
              super();
              this.attachShadow({mode: "open"})
                      .appendChild(
                              template.content.cloneNode(true)
                      );
       }
       
}
```

4. définir le custom-element (balise html)
```ts
customElements.define('sog-dice', Dice);
```
* sog-dice sera le nom de la balise
* il faut un nom de balise avec un préfixe (sinon pas valide)
* sog pour stopOrGo

5. importer le composant dans index.html
  
```html
<script src="./src/dice/dice.component.ts"></script>

<sog-dice></sog-dice>
```
6. lancer le projet et voir le composant
