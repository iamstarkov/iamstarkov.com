import Document, { Head, Main, NextScript } from "next/document";
import { Gauges } from "../components";

export default class MyDocument extends Document {
  render() {
    return (
      <html dir="LTR" lang="en-us">
        <Head>
          <meta
            key="X-UA-Compatible"
            httpEquiv="X-UA-Compatible"
            content="IE=edge"
          />
          <meta key="viewport" name="viewport" content="width=device-width" />
          <link key="dns" rel="dns-prefetch" href="https://cdn.rawgit.com" />
          <link
            key="preload1"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
            href="https://cdn.rawgit.com/tonsky/FiraCode/1.204/distr/woff/FiraCode-Regular.woff"
          />
          <link
            key="preload2"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
            href="https://cdn.rawgit.com/tonsky/FiraCode/1.204/distr/woff2/FiraCode-Regular.woff2"
          />
          <meta
            key="og:site_name"
            property="og:site_name"
            content="Vladimir Starkov"
          />
          <meta
            key="article:author"
            property="article:author"
            content="https://iamstarkov.com/about/"
          />
          <meta key="twitter:card" name="twitter:card" content="summary" />
          <meta key="twitter:site" name="twitter:site" content="@iamstarkov" />
        </Head>
        <body>
          <div className="wrap">
            <Main />
          </div>
          <NextScript />
          <Gauges />
        </body>
      </html>
    );
  }
}
