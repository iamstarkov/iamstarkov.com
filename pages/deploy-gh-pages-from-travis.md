import { Meta } from '../components'

<Meta
  title="Deploy to GitHub pages from Travis CI"
  description="Imagine that you have open-source project, which site is hosting on github pages and you have 'edit on github' button on this site. It’s great, because if you are lucky, you will get few pull-requests every week. On the other side you will need laptop every time, you want to deploy changes and, you know, it’s a bit annoying."
/>

# Deploy to GitHub pages from Travis CI

_May 10, 2015_

Imagine that you have open-source project, which site is hosting on github pages and you have "edit on github" button on this site. It’s great, because if you are lucky, you will get few pull-requests every week. On the other side you will need laptop every time, you want to deploy changes and, you know, it’s a bit annoying.

In this article will show how travis can help you with deploying your project’s
site. I’ll not teach you how to build your site or how to use travis,
I’m assuming, that you already have build step and deploy steps, which are
working properly on your machine, and you know Travis CI basics.

First of all, you will discover that Travis has no support for
[github pages deployment][deploy-list]. Okay. But we have deploy step,
which are working fine, let’s try it. Unfortunately it will not work this way.
For understanding this, why this happening, we need some travis intro.

Travis will clone your repository, then test, build and deploy. And there are
some pitfalls in the way Travis clone projects. First of all, travis doing
it by `git` protocol and this protocol only for cloning (not pushing).
Second problem is that Travis CI have no permissions to push anything to your
repos. Let’s fix it. Also, travis cannot commit anything because
of non-configured git environment, but it’s a minor problem.

![Travis CI](https://i.imgur.com/U1K3xkv.png)

[deploy-list]: http://docs.travis-ci.com/user/deployment/

## Deploying

Basically deploy step is pretty simple: commit build folder in another branch,
and push it. Why it works on your machine and will not work on Travis? It is
because you have configured git and proper permissions on your machine.

### git environment

Let’s configure git on travis first. By this I mean, you need to provide
credentials with with travis will commit build folder.

```
git config --global user.email "your@gmail.com"
git config --global user.name "your name"
```

Add this lines to `before_script` section of your _.travis.yml_.

### Fixing `git` protocol in `remote`

This part is easy, we need to switch original _origin_ remote with new
appropriate one.

```
git remote rm origin
git remote add origin https://github.com/user/repo.git
```

Yep, Add this lines to `before_script` section of your _.travis.yml_ too.

### Permission to push

It’s a tricky part, you need find out a secure way to pass your github
credentials to travis. God bless GitHub—you can get your access token
from [GitHub access token][tokens] page.

> Personal access tokens function like ordinary OAuth access tokens.
> They can be used instead of a password for Git over HTTPS, or can be
> used to authenticate to the API over Basic Authentication.  
> [from the tokens page][tokens]

Ok, you have your credential, but storing them in plaintext is bad idea,
and you need more secure way to use it.
God bless Travis—[you can use travis gem][travis-encrypting] to encrypt
github token and it to your travis config.

```
gem install travis
travis encrypt GH_TOKEN="github-token" --add
```

After this step you will find new lines in your travis config:

```yml
env:
  global:
    secure: "encrypted-github-token"
```

Now you need to use this token in origin remote. It’s simple:

```
https://user:${GH_TOKEN}@github.com/user/repo.git
```

[tokens]: https://github.com/settings/tokens
[travis-encrypting]: http://docs.travis-ci.com/user/encryption-keys/

## Other pitfalls

### Failed builds for deployed branch

Once you deploy something travis will try to run tests there and will fail,
because there is no travis config there. Go to settings and _turn on
"Build only if .travis.yml is present" option_ or you can also copy travis
config to build folder, but I don’t like it.

![travis options](https://i.imgur.com/KCTdobz.png)

You will face this problem only if your "deploy" branch differs from `gh-pages`,
e.g. you want to build site for your github user (repo _user.github.io_),
in this case you need to push to master branch, unlike `gh-pages` branch in
most cases, which is already ignored by travis.

### Commits in branches will also be deployed

Yep, all the branches except deployed have _.travis.yml_. This issue can be
easily resolved with [branches whitelisting][branch-whitelisting].

```
branches:
  only:
    - your-branch
```

[branch-whitelisting]: http://docs.travis-ci.com/user/build-configuration/#White--or-blacklisting-branches

## Final solution

It’s all about `.travis.yml`. It should look like this in the end:

```yml
branches:
  only:
    - your-branch
before_script:
  - git config --global user.email "your@gmail.com"
  - git config --global user.name "your name"
  - git remote rm origin
  - git remote add origin https://user:${GH_TOKEN}@github.com/user/repo.git
script: npm run deploy
env:
  global:
    secure: encrypted-github-token
```

Relax and take a beer—travis will be deploying for you!

_Spend time on creating stuff, not deploying,  
your [Vladimir Starkov](https://iamstarkov.com)_
