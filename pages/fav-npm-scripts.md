import { Meta } from '../components'

<Meta
  title="Favorite npm scripts"
  description="I use 'npm scripts' a lot to automate things. What I need to automate?"
/>

# Favorite npm scripts

_July 12, 2015_

I use [npm scripts](/npm-scripts-basics/) a lot to automate things. What I need to automate?

- ES6 handling
- Testing and coverage
- Publishing

## Preparation

    npm install --save-dev babel isparta mocha coveralls
    # or
    npm i -D babel isparta mocha coveralls

## ES6 handling

Babel to the rescue! Babel is helping me to transpile and test my ES6 code.

- `babel index.js > index.es5.js` — regular [transpiling][cli]
- `some.es6.js --require babel/register` — enable ES6 for your code with [`--requre` hook][require]

I use require hook in development, and transpiling for publishing.

[cli]: https://babeljs.io/docs/usage/cli/
[require]: https://babeljs.io/docs/usage/require/

## Testing and coverage

Test ES6 code and introduce _tdd_ mode:

    "test": "mocha --require babel/register",
    "tdd": "npm test -- --watch",

Obvious `coverage` script with `coveralls` one sending coverage report to coveralls service and `precoveralls` because `coveralls` need some reports to be able to send.

    "coverage": "isparta cover \_mocha index.js -- --require babel/register",
    "precoveralls": "npm run coverage",
    "coveralls": "coveralls < coverage/lcov.info",

I prefer `pre/post` script approach instead of `&&` one, because `&&` is not working on Windows.

# Publishing

As far as I need to publish ES5 code I need transpiling, and I have to do it every time before publishing. Ave `prepublish` script! After publishing I want to cleanup and push changes (bumped version and tag) to remote repository.

    "transpile": "babel index.js > index.es5.js",
    "prepublish": "npm run transpile",
    "postpublish": "rm \*.es5.js && git push --follow-tags"

Also I need to point to ES5 version in `main` field in `package.json`:

    "main": "index.es5.js",

Publishing process:

    npm version patch && npm publish

## Summary

Run:

    npm i -D babel mocha isparta coveralls

Paste in pkg:

    "main": "index.es5.js",
    "scripts": {
      "test": "mocha --require babel/register",
      "tdd": "npm test -- --watch",
      "coverage": "isparta cover \_mocha index.js -- --require babel/register",
      "precoveralls": "npm run coverage",
      "coveralls": "coveralls < coverage/lcov.info",
      "transpile": "babel index.js > index.es5.js",
      "prepublish": "npm run transpile",
      "postpublish": "rm \*.es5.js && git push --follow-tags"
    },

I’m using these 8 scripts in almost every my projects for last few months. You can do it too.

_Just automate it,  
your [Vladimir Starkov](https://iamstarkov.com/)_
