import { Meta } from '../components'

<Meta
  title="Speed up your development with npm init command"
  description="npm has a great command npm init which allows you to create package.json in a second!"
/>

# Speed up your development with `npm init` command

_April 21, 2015_

npm has a great command `npm init` which allows you to create `package.json` in a second!

## npm init

Read the documentation for [`npm init`][init] and for [`package.json fields`][pkg]. Awesome tools come with great responsibility. [Learn them!][docs]

[docs]: https://docs.npmjs.com/
[init]: https://docs.npmjs.com/cli/init
[pkg]: https://docs.npmjs.com/files/package.json

## init variables

Set it up! These init variables will be used everytime you run `npm init`
and thus will save your time. Variables will be saved in [`.npmrc files`][npmrc].

`npm set` is an shorthand alias for cli command [`npm config set`][config].
As an example, this is how setting up looks like:

```
npm set init-author-email iamstarkov@gmail.com
npm set init-author-name Vladimir Starkov
npm set init-author-url https://iamstarkov.com/
npm set init-license MIT
npm set init-version 0.0.0
```

I prefer to use `0.0.0` init version; it lets me test the code in CI server
before bumping the first major version.

[npmrc]: https://docs.npmjs.com/files/npmrc
[config]: https://docs.npmjs.com/cli/config

## GitHub shortcut expansion (user/repo)

When `npm init` will ask you about your git repository, type simply
`user/repo` — npm is clever enough to expand the line
into `https://github.com/user/repo`. npm will generate the repository, bugs,
and homepage fields in this way:

```
"repository": {
  "type": "git",
  "url": "https://github.com/user/repo"
},
"bugs": {
  "url": "https://github.com/user/repo/issues"
},
"homepage": "https://github.com/user/repo#readme"
```

_Use npm wisely, develop faster,_  
_your npm-inited [Vladimir Starkov](https://iamstarkov.com/)_
