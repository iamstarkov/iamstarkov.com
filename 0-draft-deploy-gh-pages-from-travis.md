# How to deploy to GitHub pages from Travis CI?

_10 may 2015_

Imagine that you have open-source project, which site is hosting on github pages and you have "edit on github" button on this site. It’s great, because if you are lucky, you will get few pull-requests every week. On the other side you will need laptop every time, you want to deploy changes, and, you know, it’s a bit annoying.

In this article will show how travis can help you with deploying your project’s site. I’ll not teach you how to build your site or how to use travis, I’m assuming, that you already have build step and deploy steps, which are working properly on your machine, and you know Travis CI basics.


First of all, you will discover that Travis has no support for [github pages deployment][deploy-list]. Okay. But we have deploy step, which are working fine, let’s try it. Unfortunately it will not work this way. For understanding this, why this happening, we need some travis intro.

Travis will you repository, before test, build and deploy. And there are some pitfalls in the way Travis clone projects. First of all doing it by `git` protocol and this protocol only for cloning (not pushing). Second problem is that Travis CI have no permissions to push anything to your repos. Let’s fix it.

![Travis CI](http://i.imgur.com/U1K3xkv.png)

[deploy-list]: http://docs.travis-ci.com/user/deployment/

## Deploying

You already have cloned repo, and the way to clone it one more time (with proper protocol) is very ugly solution. Truth is near. @TODO link to X-files. There is much better solution — you can change protocol in the remotes list. Repo’s Url by which it  was cloned, usually are stored into `origin` remote.

Next problem is that Travis have no permissions to access your repo. It can be fixed in 3 easy steps: generate [GitHub access token][tokens], encrypt and add it to the _.travis.yml_. You should encrypt it, because token gives ability to push anything with your credentials, without password.

> Personal access tokens function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to authenticate to the API over Basic Authentication. — [from the tokens page][tokens]

Generate your token in the GitHub settings, in the
_[Personal access tokens][tokens]_ section. You will get token, it will look
like long string of random letters and digits — usual hash.

> First, we'll encrypt the token so only Travis can see it. For this,
you need the travis Rubygem installed: `gem install travis`.
— from [awesome answer on SO][SO]

When you have travis gem installed and a token too. You finally can encrypt it
and add it to your _.travis.yml_:

```sh
travis encrypt GH_TOKEN="github-token" --add
```

After this step you will find new lines in your travis config:

```yml
env:
  global:
    - secure: "secure-github-token"
```

Great! Now you can compose combine both solutions. And you should replace remotes in travis environment with proper ones with desirable permissions:

```yml
before_script:
  - git remote rm origin
  - git remote add origin https://iamstarkov:${GH_TOKEN}@github.com/iamstarkov/iamstarkov.github.io.git
```

[tokens]: https://github.com/settings/tokens
[SO]: http://stackoverflow.com/a/18029286/1057730

```sh
git remote rm origin
git remote add origin https://user:${GH_TOKEN}@github.com/user/repo.git
```
