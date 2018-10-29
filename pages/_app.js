import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ArticleMenu } from "../components";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isIndex = router.route === "/";
    const isTalk = router.route.startsWith("/talks/");
    const ghUrl = "https://github.com/iamstarkov/iamstarkov.com";
    const editUrl = `${ghUrl}/edit/master/pages${
      isIndex ? "/index" : router.route
    }.${isIndex ? "js" : "md"}`;

    if (isTalk) {
      return (
        <Container>
          <Head>
            <meta
              key="og:url"
              name="og:url"
              content={`https://iamstarkov.com${router.route}`}
            />
          </Head>
          <Component {...pageProps} />
        </Container>
      );
    }

    return (
      <Container>
        <Head>
          <meta
            key="og:url"
            name="og:url"
            content={`https://iamstarkov.com${router.route}`}
          />
          <link key="stylesheet" rel="stylesheet" href="/static/styles.css" />
        </Head>
        <a className="edit-link" target="_blank" rel="noopener" href={editUrl}>
          edit on github
        </a>
        {isIndex ? (
          <Component {...pageProps} />
        ) : (
          <article>
            <Component {...pageProps} />
          </article>
        )}

        <ArticleMenu />
      </Container>
    );
  }
}
