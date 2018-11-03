import { Meta } from '../components';

<Meta
  title="5 preload gotchas i wish i would knew in advance"
  description="Everybody heard of preloading assets ahead of time. But handful of developers actually tried it. Even smaller number of developers actually managed to push this improvement to production environment and that said to end users or customers. Im about to participate in this healthy trend, so I'm in the process of research and development. Here are some gotchas i wish i would knew in advance."
/>

# 5 preload gotchas i wish i knew in advance

_October 10, 2017_

Everybody heard of preloading assets ahead of time. But handful of developers actually tried it. Even smaller number of developers actually managed to push this improvement to production environment and that said to end users or customers. Im about to participate in this healthy trend, so I'm in the process of research and development. Here are some gotchas i wish i would knew in advance.

_Disclaimer: im sorry for clickbaity title, its not really gotchas, but something i didnt expect before i read specification. But i still cant believe in 4th point._

## 1) obligatory `as` attribute

> The attribute is necessary to guarantee correct prioritization, request matching, application of the correct policy, and setting of the appropriate `Accept` request header.  
> [Preload, '"as" attribute' by w3c spec](https://www.w3.org/TR/preload/#as-attribute)

Basically, if you want to preload resource `${url}` to use in tag `${tag}`, then you need to preload it like these `<link rel="preload" as="${tag}" href="${url}" />`. Some examples are:

- to preload `<script />` use `<link rel=preload as=script href=… />`
- to preload `<style />` or `<link rel=stylesheet>` use `<link rel=preload as=style href=… />`

See more examples in the [specification](https://www.w3.org/TR/preload/#as-attribute)

## 2) preload is separated from execution

Say you preload your have CSS been loading like this: `<link rel="stylesheet" href="/styles.css" />`, so you change it to `<link rel="preload" as="style" href="/styles.css" />`. You reload your page, and see your page completely unstyled. So yes, browser will download resources ahead of time, but wont know how to use until somewhere in the page it will be consumed.

## 3) `onload` attribute

In order to fix it, you can use onload attribute `<link rel="preload" as="style" href="/styles.css" onload="this.rel='stylesheet'" />`. If you are not familiar with javascript, then this `this.rel='stylesheet'` will be executed when browser will finish downloading `styles.css` and this line will change value of `rel` attribute to from `preload` to `stylesheet`. Thus force browser to apply it.

## 4) fallbacks are tricky

`<link rel="preload" as="style" href="/styles.css" onload="this.rel='stylesheet'" />` will work only with javascript enabled. In order to fix it you would need to add `<noscript><link rel="stylesheet" href="/styles.css" /></noscript>`. But there is a caveat here: you have a working solution for browsers with support for preload and enabled javascript, and for browsers with JS disabled. There is one set of browsers we forgot here. Browsers with enabled JS, but without `preload` support. And its 42% of market share.

As far as stylesheets use `rel="stylesheet"` and preload use `rel="preload"`, you have no easy way to fallback one `link` tag to make it preloadable for modern browsers, and normal for everybody else. It does complicate things.

One approach might be to include both preloaded stylesheet link tag and normal one.

```html
<link rel="preload" as="style" href="/styles.css" />
<link rel="stylesheet" href="/styles.css" />
```

For sure, we fixed our css for all browsers, did we? we definitely fixed CSS availability for browsers which dont support `preload`. What about modern browsers?

Lets re-iterate, why one would like to use preloaded css? The reason is to have CSS which doesnt block render. Lets take a look at our example again. First, we included preloaded css. So browser will start to download it immediately. Next line is normal link CSS tag, here browser will see that the same stylesheet is critical for render and will block render until CSS file is downloaded. There is no bulletproof way to use preload for CSS with and without JS support. Let that sink in.

## 5) fonts preloading requires anonymous `crossorigin` attribute

> For font loads, user agents must use the potentially CORS-enabled fetch method defined by the HTML5 specification for URL's defined within `@font-face` rules. When fetching, user agents must use "Anonymous" mode, set the referrer source to the stylesheet's URL and set the origin to the URL of the containing document.
> [CSS Fonts Module Level 3, w3c spec](https://drafts.csswg.org/css-fonts/#font-fetching-requirements)

## Further reading

- [Preload: What Is It Good For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) by Smashing Magazine
- [Preloading content with rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) by MDN
- [Preloading with Critical Path CSS](http://brianflove.com/2016/07/21/preloading-with-critical-path-css/) by Brian Love
- [Preload spec](https://www.w3.org/TR/preload/#as-attribute) by w3c
- [CSS Fonts Module Level 3 spec](https://drafts.csswg.org/css-fonts/) by w3c

## Summary

`preload` is awesome. Use it for JS, fonts and images. Let me know if you mastered it for CSS as well. Now, go ahead and build fast websites.

_Psst… wanna some ahead of time loading?_  
_Your non-relativistic [Vladimir Starkov](https://iamstarkov.com/)_
