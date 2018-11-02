import Head from "next/head";

export const Meta = props => (
  <Head>
    <title key="title">{props.title}</title>
    <meta key="og:title" name="og:title" content={props.title} />
    <meta
      key="description"
      property="description"
      content={props.description}
    />
    <meta
      key="og:description"
      name="og:description"
      content={props.description}
    />
    {!!props.image && (
      <meta key="og:image" name="og:image" content={props.image} />
    )}
  </Head>
);
