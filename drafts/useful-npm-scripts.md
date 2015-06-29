# My useful npm scripts

_19 june 2015_

I found that not every nodejs developer know about and how to use npm scripts.
So I decided to share my collection of npm scripts which I’m using
in almost every package or application.

## npm scripts 101

package.json can have `scripts` fields, which is basically an object, which
looks like this:

      "scripts": {
        "name": "command-to-run",
        "name1": "command-to-run1",
        "name2": "command-to-run2"
      }

npm are doing really simple job: when you run `npm run smth`, npm search "smth" in "scripts" object and run according `command-to-run`.

### shortcuts: start and test

    npm start # npm run start
    npm test  # npm run test

These commands are common and widely accepted way to start and test nodejs applications or packages.


## Favorite scripts

I want to test my code, use tdd and measure test coverage. Also I want to use es6, so I need to transpile my source code before publishing it to es5 environment. Favorite scripts are helping me with all these tasks.


## test

      "test": "mocha --require babel/register",

Test all the things!


  "coverage": "istanbul cover _mocha -- --require babel/register",
  "precoveralls": "npm run coverage",
  "coveralls": "coveralls < coverage/lcov.info",
  "tdd": "npm test -- --watch",
  "transpile": "babel index.js > index.es5.js",
  "prepublish": "npm run transpile",
  "postpublish": "rm *.es5.js && git push --follow-tags"
