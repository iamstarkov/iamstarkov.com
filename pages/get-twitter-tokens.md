import { Meta } from '../components'

<Meta
  title="How to get Twitter API tokens"
  description="It maybe seems that start playing with Twitter API can be hard to start, but actually it’s not. First of all, you need to get tokens, to start. And this process is very easy."
/>

# How to get Twitter API tokens

_October 15, 2015_

It maybe seems that start playing with [Twitter API][api] can be hard to start, but actually it’s not. First of all, you need to get tokens, to start. And this process is very easy.

1. Go to ["Create new Twitter App"](https://apps.twitter.com/app/new) form.
2. Fill it. Callback URL is not required.  
   ![filled form](https://i.imgur.com/fnMGBQn.png)
3. Agree to "Developer Agreement", submit form.
4. Go to "Keys and Access Tokens" tab  
   !["Keys and Access Tokens" tab](https://i.imgur.com/C13BEpG.png)
5. At the bottom, you will find empty "Your Access Token" with _"Create my access token"_ button, go ahead and click it.  
   !["Your Access Token"](https://i.imgur.com/bwClX9c.png)
6. Click _"Test OAuth"_ button in the top right corner.  
   !["Test OAuth"](https://i.imgur.com/1GXcM1D.png)

Tokens are "**Consumer Key**", "**Consumer Secret**" and "**Access Token**" with "**Access Token Secret**":  
![app tokens in one place](https://i.imgur.com/trkuXvm.png)  
or `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET` and `TWITTER_ACCESS_TOKEN_KEY`, `TWITTER_ACCESS_TOKEN_SECRET` if you will use them as environment variables.

**Congratulations**, you have Twitter API tokens.

Be careful with them. Pay attention to small gray warning on the page:

> Keep the "Consumer Secret" a secret. This key should never be human-readable in your application.

and

> This access token can be used to make API requests on your own account's behalf. Do not share your access token secret with anyone.

Don’t commit it in your repo. Use environment variables instead.

[api]: https://dev.twitter.com/rest/public

_140 symbols ought to be enough for anybody,  
your [Vladimir Starkov](https://iamstarkov.com)_
