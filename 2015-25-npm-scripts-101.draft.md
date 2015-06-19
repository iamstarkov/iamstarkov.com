# npm scripts 101

_19 june 2015_

package.json can have `scripts` fields, which is basically an object, which
looks like this:

      "scripts": {
        "name": "command-to-run",
        "name1": "command-to-run1",
        "name2": "command-to-run2"
      }

npm are doing really simple job: when you run `npm run smth`, npm search "smth" in "scripts" object and run according `command-to-run`.

## shortcuts: start and test

    npm start # npm run start
    npm test  # npm run test

These commands are common and widely accepted way to start and test nodejs applications or packages.

_Do your wanna talk about npm scripts?  
Your npm-scripted [Vladimir Starkov](https://iamstarkov.com)_
