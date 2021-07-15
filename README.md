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
