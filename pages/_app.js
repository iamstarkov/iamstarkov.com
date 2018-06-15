import React from "react";
import App, { Container } from "next/app";
import Head from 'next/head'
import { ArticleMenu } from "../components";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isIndex = router.route === "/";
    const ghUrl = "https://github.com/iamstarkov/iamstarkov.com";
    const editUrl = `${ghUrl}/edit/master/pages${isIndex ? '/index' : router.route}.${isIndex ? 'js' : 'md'}`
    return (
      <Container>
        <Head>
          <meta key="og:url" name="og:url" content={`https://iamstarkov.com${router.route}`} />
        </Head>
        <a
          className="edit-link"
          target="_blank" rel="noopener"
          href={editUrl}
        >
          edit on github
        </a>
        {isIndex ? (
          <Component {...pageProps} />
        ) : (
          <article>
            <Component {...pageProps} />
          </article>
        )}

        {!isIndex && <ArticleMenu />}
      </Container>
    );
  }
}
