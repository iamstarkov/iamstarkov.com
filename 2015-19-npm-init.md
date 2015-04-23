# Speedup your development with `npm init` command

_21 april 2015_

npm have a great command `npm init`, which allow you to create `package.json` in second!

## npm init

Read documentation for [`npm init`][init-rtfm] and for [`package.json`][pgk-rtfm] fields.
You have responsibility to know tools you are using.

[init-rtfm]: https://docs.npmjs.com/cli/init
[pgk-rtfm]: https://docs.npmjs.com/files/package.json

## init variables

Set it up! This init variables will be used everytime you run npm init, so you save your own time. Config variables are stored in [`.npmrc` files][npmrc-rtfm].

[npmrc-rtfm]: https://docs.npmjs.com/files/npmrc

For example for me setting up looks like this:

```
npm set init-author-email iamstarkov@gmail.com
npm set init-author-name Vladimir Starkov
npm set init-author-url http://iamstarkov.com/
npm set init-license MIT
npm set init-version 0.0.0
```

I use `0.0.0` init version, because I prefer to test my code in CI server
before bumping first major version.

## GitHub shortcut expansion (user/repo)

when npm init will ask you about git repository, type short version
`user/repo` — npm is clever enough to expand this into
`https://github.com/user/repo`. In reality npm will generate repository,
bugs and homepage fields in this way:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/user/repo.com"
},
"bugs": {
  "url": "https://github.com/user/repo.com/issues"
},
"homepage": "https://github.com/user/repo.com"
```

_Use npm wisely, develop faster,_  
_your npm-inited [Vladimir Starkov](http://iamstarkov.com/)_
