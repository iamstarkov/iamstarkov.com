import Head from 'next/head'

export default () => <>
  <Head key="head">
    <title key="title">
      Vladimir Starkov
    </title>
    <meta key="description"    property="description" content="Frontend blog from Vladimir Starkov" />
    <meta key="og:url"         name="og:url"          content="https://iamstarkov.com/" />
    <meta key="og:description" name="og:description"  content="Frontend blog from Vladimir Starkov" />
    <meta key="og:title"       name="og:title"        content="Vladimir Starkov" />
  </Head>

  <h1 key="h1">
    Vladimir Starkov
  </h1>

  <nav key="nav">
    <a href="/mvb"> MVB </a>
    {", "}
    <a href="/mvb2"> MVB 2 </a>
    {", "}
    <a href="/about/">
      About
    </a>
    {", "}
    <a href="/talks/">

      Talks
    </a>
    {" and "}
    <a href="https://www.linkedin.com/in/iamstarkov" target="_blank" rel="noopener">
      LinkedIn
    </a>
    {" • "}
    <a href="https://google.com/?q=site:iamstarkov.com+smth" target="_blank" rel="noopener">
      search "smth"
    </a>
    <br />
    <a href="https://twitter.com/iamstarkov" target="_blank" rel="noopener">
      Follow me on Twitter
    </a>
  </nav>
</>
