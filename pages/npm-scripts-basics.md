import { Meta } from '../components'

<Meta
  title="npm scripts basics"
  description="package.json can have scripts fields, which are basically an object similar to this one"
/>

# npm scripts basics

_June 19, 2015_

package.json can have [`scripts` fields](scripts), which are basically an object similar to this one:

      "scripts": {
        "name": "command-to-run",
        "name1": "command-to-run1",
        "name2": "command-to-run2"
      }

npm does a really simple job: when you run `npm run smth`, npm searches "smth" in "scripts" object and runs appropriate `command-to-run`.

## shortcuts: start and test

    npm start # npm run start
    npm test  # npm run test

These commands are common and widely accepted way to start and test nodejs applications or packages.

## pre and post scripts

npm also can run some scripts right before or after others:

- `pretest` will be executed everytime before `test`
- `postpublish` will be executed everytime after `publish`

[scripts]: https://docs.npmjs.com/misc/scripts

_Do u wanna talk about npm scripts?  
Your npm-scripted [Vladimir Starkov](https://iamstarkov.com)_
