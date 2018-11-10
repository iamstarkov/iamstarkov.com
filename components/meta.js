import Head from "next/head";

const coerceUrl = x =>
  x.startsWith("http") ? x : `https://iamstarkov.com${x}`;

export const Meta = ({ title, description, image }) => (
  <Head>
    <title key="title">{title}</title>
    <meta key="og:title" name="og:title" content={title} />
    <meta key="description" property="description" content={description} />
    <meta key="og:description" name="og:description" content={description} />
    {!!image && (
      <meta key="og:image" name="og:image" content={coerceUrl(image)} />
    )}
  </Head>
);
