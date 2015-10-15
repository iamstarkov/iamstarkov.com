# How to get Twitter API tokens

_15 october 2015_

It maybe seems that start playing with [Twitter API][api] can be hard to start,
but actually it’s not. First of all, you need to get tokens, to start.
And this process is very easy.

1. Go to ["Create new Twitter App"](https://apps.twitter.com/app/new) form.
2. Fill it. Callback URL is not required.  
  ![filled form](http://i.imgur.com/fnMGBQn.png)
3. Agree to "Developer Agreement", submit form.
4. Go to "Keys and Access Tokens" tab  
  !["Keys and Access Tokens" tab](http://i.imgur.com/C13BEpG.png)
5. At the bottom, you will find empty "Your Access Token" with "Create my access token" button, go ahead and click it.  
  !["Your Access Token"](http://i.imgur.com/bwClX9c.png)

You will find "**Consumer Key**" and "**Consumer Secret**" in the "Application Settings" section.  
And "**Access Token**" with "**Access Token Secret**" in the "Your Access Token" section.  
![app tokens in one place](http://i.imgur.com/TjLHWB2.png)

**Congratulations**, you have Twitter API tokens.

Be carefull with them. Pay attention to small gray warning on the page:

> Keep the "Consumer Secret" a secret. This key should never be human-readable in your application.

and

> This access token can be used to make API requests on your own account's behalf. Do not share your access token secret with anyone.

Don’t commit it in your repo. Use environment variables instead.

[api]: https://dev.twitter.com/rest/public

_140 symbols ought to be enough for anybody,  
your [Vladimir Starkov](https://iamstarkov.com)_
