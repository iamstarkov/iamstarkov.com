import { Meta } from '../components'

<Meta
  title="How to start with nodejs testing"
  description="With this 5 minute intro I’ll show how to test your code with yayify example, which only add 'yay' to the end of the string. If you heard about testing and tdd, but still haven’t tried then this article is definitely for you."
  image="https://i.imgur.com/Fe1uwiv.png"
/>

# How to start with nodejs testing

_July 21, 2015_

![yayify testing](https://i.imgur.com/Fe1uwiv.png)  
With this 5 minute intro I’ll show how to test your code with [yayify][yayify] example, which only add 'yay' to the end of the string. If you heard about testing and tdd, but still haven’t tried then this article is definitely for you.

Why do you need tests? Tests will get rid off endless improvement headache at the start or refactoring fear after, also tests will help to verify changes in pull-requests.

To start testing your modules, you will need _tools, workflow, tests itself and code to test for_.

## Tools

To be able to write tests, you need [babel][babel] for [es6][es6], [mocha][mocha] as a test-runner, and [assert][assert] to verify correct work of your module:

    npm install --save-dev babel mocha assert
    # or
    npm i -D babel mocha assert

## Workflow

It‘s helpful to have [script helpers](fav-npm-scripts) to simplify testing workflow. Add this lines to scripts field in package.json:

```json
"test": "mocha --require babel/register",
"tdd": "npm test -- --watch",
```

`test` is supposed to run to verify that everything is ok. `tdd` is supposed to be run while development to have instant feedback. Basically this will allow mocha to watch you index.js for modification and rerun tests on every change.

## Tests

You need to import `yayify` module to test for and which you’ll write in the future; `equal` is super simple function from [assert][assert] module. Function `it` is inserted into global namespace by mocha to name your tests.

[test.js][test.js]:

    import yayify from './index';
    import { equal } from 'assert';

    it('should yayify', () => {
      equal(yayify('tdd'), 'tdd yay')
    });

Congratulations! You just wrote your first tests. Was it hard? Don’t think so. Let’s continue. There are tests, but there is no `yayify` function to test for. Let’s fix this. For instant feedback while implementing `yayify` please run `npm run tdd` in terminal in a folder with your project.

Then create _[index.js][index.js]_ and write there this line:

    export default str => str + ' yay';

Look back to your terminal: green tests! You are awesome!

![yayify testing](https://i.imgur.com/Fe1uwiv.png)

Save and commit this good enough state of things.

Have you heard about [es6 template strings][template-strings]? Let’s use them:

    export default str => `${str} + yay`;

Take a look at terminal again, green or red?

![red tests](https://i.imgur.com/cLGlAfB.png)

Tests should be red. It is because es6 template strings don’t need concatenation; you can write like this `${str} yay` and omit plus sign. Lets fix it:

    export default str => `${str} yay`;

Take a look at your teminal last time:

![](https://i.imgur.com/Jb4kWAN.png)

Tests are green again!

## Summary

You can find this module in [yayify][yayify] repo and play with it:

    git clone https://github.com/iamstarkov/yayify.git
    cd yayify
    npm i
    npm test

I hope, you learned something new today and no longer afraid of node js testing, otherwise pls tell me about your [obstacles in twitter][twitter].

_Keep it testable, keep is safe,  
your testable [Vladimir Starkov](https://iamstarkov.com)_

[template-strings]: https://github.com/lukehoban/es6features#template-strings
[es6]: https://git.io/es6features
[twitter]: https://twitter.com/iamstarkov
[babel]: https://npmjs.com/package/babel
[mocha]: https://npmjs.com/package/mocha
[assert]: https://npmjs.com/package/assert
[yayify]: https://github.com/iamstarkov/yayify
[fav-npm-scripts]: https://iamstarkov.com/fav-npm-scripts/
[test.js]: https://github.com/iamstarkov/yayify/blob/master/test.js
[index.js]: https://github.com/iamstarkov/yayify/blob/master/index.js
