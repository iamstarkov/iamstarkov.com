import { Meta } from '../components'

<Meta
  title="commonmark-helpers is out!"
  description="Basically, with commonmark-helpers you can find desire elements in markdown document and process them in html or plaintext format."
  image="https://i.imgur.com/CM0V0d4.png"
/>

# [commonmark-helpers][helpers] is out!

_May 10, 2015_

![commonmark-helpers passing all the tests!](https://i.imgur.com/CM0V0d4.png)  
Basically, with commonmark-helpers you can find desire elements in markdown document
and process them in html or plaintext format.

When I was creating this blog, I faced issue with extracting data from
raw markdown also I wanted to try [commonmark][commonmark], because
I believe It will be standard for markdown in the future. Hopefully,
commonmark have rich API for traversing AST tree for your markdown documents.

Since I’m using it for several months, I can conclude, that commonmark
is awesome and also that it’s API is in process of evolving. It’s not good,
it’s not bad—it’s normal. I developed first version of this blog with
commonmark itself, and this experience help me to understand what API helpers
I need from commonmark. That was the birth of _[commonmark-helpers][helpers]_.

I was wrapping my head with these ideas for while, and then I finally
implemented it today! It contains only [41 sloc][src], it small and very
easy to useful.

Basicaly it contains three methods:

- `html` — for converting markdown into html
- `text` — for converting markdown into plain text
- `match` — for matching nodes from AST tree — most valuable method in whole
  module. All other methods are minor or shortcuts to `match`.

With `match` method you can pick any node of your markdown document:
header, paragraph in simple cases, and for example first paragraph without
date statement inside — in complicated cases. With a js closures you can store
matching results and create something like `text` method:

```
const text = (input)=> {
  let res = '';
  match(input, (event)=> {
    res += isString(literal(event)) ? literal(event) : '';
  });
  return res;
}
```

Yep, `text` is implemented with `match`.

Very important to notice, that this package is very simple and doesn’t contain
any smart and/or complicated logic, that’s why it’s tightly coupled with
[commonmark API for AST tree][commonmark-api]. Check it out first.

Of course, it’s covered with tests. If you want to do something with markdown
for youself try [commonmark][commonmark] and these [helpers][helpers].
Patches are welcomed, If you spot any error, feel free to [file an issue][issue].

I hope these helpers will be useful for commonmark community
and if so, then some of the features probably will be migrated to commonmark
itself. We will see, what will happen.

[issue]: https://github.com/iamstarkov/commonmark-helpers/issues/new
[commonmark]: https://www.npmjs.com/package/commonmark
[helpers]: https://www.npmjs.com/package/commonmark-helpers
[commonmark-api]: https://github.com/jgm/commonmark.js#usage
[src]: https://github.com/iamstarkov/commonmark-helpers/blob/master/index.js

_Write markdown, extract metadata,  
your [Vladimir Starkov](https://iamstarkov.com)_
