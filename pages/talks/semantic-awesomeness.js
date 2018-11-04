import { Meta } from "../../components";
import { WithSpectacle } from "../../components/with-spectacle";

import createTheme from "spectacle/lib/themes/default";

const theme = createTheme(
  {
    primary: "#fff",
    secondary: "#222",
    quaternary: "#b4b4b4"
  },
  {
    primary: "'Times New Roman', Times, serif"
  }
);

const semverSlide = `
## 1.0.0

* http://semver.org/
* MAJOR . MINOR . PATCH
* BREAKING . FEATURE . FIX

or

* MAJOR: intended
* MINOR: that was unexpected
* FIX: wow, who could thought of it
`;

const historySlide = `
## History

* [_17 September, 2011:_ SemVer 1.0 was just born](https://github.com/mojombo/semver/releases/tag/v1.0.0)
* [_17 March, 2012:_ conventional changelog by angular.js](https://github.com/angular/angular.js/commit/4557881cf84f168855fc8615e174f24d6c2dd6ce#diff-69272c75604d89b2311fcf3a9d843ea3)
* [_18 June , 2013:_ SemVer 2.0 release](https://github.com/mojombo/semver/releases/tag/v2.0.0)
* Stephan Bönnemann is working on Hoodie
* [_1 August, 2014:_ grunt-release-hoodie](https://github.com/robinboehm/grunt-release-hoodie/commit/33118f3a866b06efe639a6c53737b3e86aff121d)
* [_3 September 2014:_ grunt-semantic-release](https://github.com/boennemann/grunt-semantic-release/commit/e85cae6f932ce88150e0025260e34d11755f8ab8)
* [_13 June 2015:_ semantic-release](https://github.com/semantic-release/semantic-release/commit/ac7037d9482a04fb97b39aaa928ca048090dd6a6)
`;

const semanticReleaseSlide = `
## Semantic release

* https://github.com/semantic-release/semantic-release
* by [Stephan Bönnemann @boennemann](https://github.com/boennemann) (Hoodie, semantic-release, greenkeer.io)
* certain commit message format
* Changelog is derived from commit messages
* next version is derived from commit messages as well
`;

const semanticReleaseSlide2 = `
## Conventional format

<pre style="text-align: left">
    type(scope?): short message

    long description

    BREAKING CHANGES or github/jira issues mentions
</pre>
`;

const slides = `

## Prerequisites

* Continuous Integration in place
* _release-bot_ credentials:
  * ⇥ SCM access
  * ⇥ NPM registry

---
## Tool choice

* [semantic-release](https://github.com/semantic-release/semantic-release) for Travis + GitHub
* [corp-semantic-release](https://github.com/leonardoanalista/corp-semantic-release) for everything else

---
## Writing commit messages

[commitizen](https://github.com/commitizen/cz-cli) + [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) config

<pre style="text-align: left">
// ./package.json
"scripts": {
  "commit": "git-cz",
  // ...
},
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
},
</pre>

---
## Writing commit messages

![](/static/talks/sem-awe/add-commit.jpg)

---
## Validating commit messages

[husky](https://github.com/typicode/husky) + [@commitlint/{cli,config-angular}](https://github.com/marionebl/commitlint)

<pre style="text-align: left">
// ./package.json
"scripts": {
  "commitmsg": "commitlint -e $GIT_PARAMS",
}

// commitlint.config.js
module.exports = { extends: [ '@commitlint/config-angular'] }
</pre>

---

## Validating commit messages

![](/static/talks/sem-awe/commit-invalid.jpg)
vs
![](/static/talks/sem-awe/commit-valid.jpg)

---
## CI Integration

* run semantic-release only in master
* ignore commit message [ci-skip]
* ignore git tags
* ignore the release-bot

---

## semantic-release
<pre style="text-align: left">

npm install --save-dev semantic-release

// ./.travis.yml
git config user.email "release-bot@localhost"
git config user.name "release-bot"
npm run build
npm run semantic-release

// ./package.json
"scripts": {
  "semantic-release": "semantic-release pre && npm publish && semantic-release post",
}
</pre>

---

## changelog

![](/static/talks/sem-awe/semrel-changelog.jpg)

---

## corp-semantic-release

<pre style="text-align: left">
npm install --save-dev corp-semantic-release conventional-changelog-angular-bitbucket

// ./.travis.yml
git config user.email "release-bot@localhost"
git config user.name "release-bot"
git checkout master
npm run build
npm run semantic-release
npm publish

// ./package.json
"scripts": {
  "semantic-release": "corp-semantic-release --changelogpreset angular-bitbucket -v",
}
</pre>

---

## changelog

![](/static/talks/sem-awe/semrel-changelog-corp.jpg)
`;

export default () => (
  <>
    <Meta
      title="Semantic Awesomeness"
      description="Merge to master and have a release"
      image="https://iamstarkov.com/static/talks/sem-awe/title.jpg"
    />
    <WithSpectacle
      render={({ Deck, Slide, Image, Heading, Markdown, MarkdownSlides }) => {
        return (
          <Deck progress="bar" theme={theme}>
            <Slide>
              <Image src="/static/talks/sem-awe/title.jpg" />
              <Heading height="0" overflow="hidden">
                Semantic Awesomeness
              </Heading>
              <br />
              <small>
                <center>
                  <i>Merge to master and have a release</i>
                  <br />
                  <br />
                  <small>
                    by <a href="/"> Vladimir Starkov</a>
                    <br />
                    frontend engineer at{" "}
                    <a href="https://www.nordnet.se/">Nordnet Bank</a>
                  </small>
                </center>
              </small>
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/headaches.jpg">
              <Heading textColor="transparent" size={2}>
                Headaches
              </Heading>
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/my-name-is.jpg">
              <Heading textColor="transparent" size={2}>
                My name is Vladimir Starkov
              </Heading>
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/problem.jpg">
              <Heading textColor="transparent" size={2}>
                Problem
              </Heading>
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/semver.jpg">
              <Heading textColor="transparent" size={2}>
                Semantic Versioning
              </Heading>
            </Slide>
            <Slide>
              <Markdown source={semverSlide} />
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/history.jpg">
              <Heading textColor="transparent" size={2}>
                History
              </Heading>
            </Slide>
            <Slide>
              <Markdown source={historySlide} />
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/semantic-release.jpg">
              <Heading textColor="transparent" size={2}>
                Semantic Release
              </Heading>
            </Slide>
            <Slide>
              <Markdown source={semanticReleaseSlide} />
            </Slide>
            <Slide>
              <Markdown source={semanticReleaseSlide2} />
            </Slide>
            <Slide bgImage="/static/talks/sem-awe/practicalities.jpg">
              <Heading textColor="transparent" size={2}>
                Practicalities
              </Heading>
            </Slide>
            {MarkdownSlides(slides)}
            <Slide>
              <Image src="/static/talks/sem-awe/summary.jpg" />
              <Heading height="0" overflow="hidden">
                Summmary
              </Heading>
              <br />
              <small>
                <a href="/talks/semantic-awesomeness/">
                  https://iamstarkov.com/talks/semantic-awesomeness/
                </a>
              </small>
            </Slide>
            <Slide>
              <Image src="/static/talks/sem-awe/title.jpg" />
              <Heading height="0" overflow="hidden">
                Semantic Awesomeness
              </Heading>
              <br />
              <small>
                <center>
                  <i>In painless releases we trust </i>
                  <br />
                  <br />
                  <small>
                    Sincerely yours <a href="/">Vladimir Starkov</a>
                    <br />
                    <i>
                      @iamstarkov at{" "}
                      <a href="https://github.com/iamstarkov">github</a> and{" "}
                      <a href="https://twitter.com/iamstarkov">twitter</a>
                    </i>
                  </small>
                </center>
              </small>
            </Slide>
          </Deck>
        );
      }}
    />
  </>
);
