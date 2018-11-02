import Link from "next/link";

export const ArticleMenu = () => (
  <nav className="article-menu">
    <Link href="/" prefetch>
      <a>Home</a>
    </Link>
    {" • "}
    <Link href="/talks/" prefetch>
      <a>Talks</a>
    </Link>
    {" • "}
    <Link href="/about/" prefetch>
      <a>About</a>
    </Link>
    {" • "}
    <a href="https://twitter.com/iamstarkov" target="_blank" rel="noopener">
      Follow me on Twitter
    </a>
  </nav>
);
