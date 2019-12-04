module.exports = {
  "env": {
      "node": true,
      "es6": true
  },
  "extends": [
      "airbnb", "prettier"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",  "prettier"
  ],
  "parser": "babel-eslint",
  "rules": {
          "prettier/prettier": "error", 
          "react/jsx-filename-extension": ["off"], 
          "react/prop-types": ["off"], 
          "import/no-dynamic-require": ["off"] ,
          "global-require": ["off"],
  }
};