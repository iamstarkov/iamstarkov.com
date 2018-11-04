import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ArticleMenu } from "../components";

export default class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", url => {
      // time out is needed to let next/head to update head before we track the page
      setTimeout(() => {
        if (window._gauges) {
          window._gauges.push(["track"]);
        }
      }, 100);
    });
  }
  render() {
    const { Component, pageProps, router } = this.props;
    const isIndex = router.route === "/";
    const isError = router.route === "/_error";
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
        {!isIndex &&
          !isError && (
            <a
              className="edit-link"
              target="_blank"
              rel="noopener"
              href={editUrl}
            >
              edit on github
            </a>
          )}
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
