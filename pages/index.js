import { Meta } from "../components";
import Link from "next/link";

const articlesList = [
  {
    title: "Keeping up with two git identities",
    url: "/conditional-includes/",
    time: "November 14, 2018"
  },
  {
    title:
      "Pinned tabs #1: Free MIT UX course, disenchantment, react-testing-library and more.",
    url: "/pinned-tabs-1/",
    time: "November 10, 2018"
  },
  {
    title: "5 preload gotchas i wish i knew in advance",
    url: "/preload-gotchas/",
    time: "October 10, 2017"
  },
  {
    title: "Browser extensions to make GitHub better",
    url: "/better-github/",
    time: "April 20, 2017"
  },
  {
    title: "How to get Twitter API tokens",
    url: "/get-twitter-tokens/",
    time: "October 15, 2015"
  },
  {
    title: "41 week report",
    url: "/41-week-report/",
    time: "October 11, 2015"
  },
  {
    title: "40 week report",
    url: "/40-week-report/",
    time: "October 4, 2015"
  },
  {
    title: "Atom One Light theme for iTerm2",
    url: "/atom-one-iterm2/",
    time: "July 30, 2015"
  },
  {
    title: "How to start with nodejs testing",
    url: "/start-with-testing/",
    time: "July 21, 2015"
  },
  {
    title: "Favorite npm scripts",
    url: "/fav-npm-scripts/",
    time: "July 12, 2015"
  },
  {
    title: "Why immutability matters",
    url: "/why-immutability-matters/",
    time: "June 28, 2015"
  },
  {
    title: "npm scripts basics",
    url: "/npm-scripts-basics/",
    time: "June 19, 2015"
  },
  {
    title: "Weekly 20",
    url: "/weekly-20/",
    time: "May 16, 2015"
  },
  {
    title: "iojs is joining the Node Foundation. What does it mean?",
    url: "/iojs-and-node-foundation/",
    time: "May 16, 2015"
  },
  {
    title: "Just published get-tweets package",
    url: "/get-tweets-release/",
    time: "May 16, 2015"
  },
  {
    title: "Gmail setup",
    url: "/gmail-setup/",
    time: "May 12, 2015"
  },
  {
    title: "Deploy to GitHub pages from Travis CI",
    url: "/deploy-gh-pages-from-travis/",
    time: "May 10, 2015"
  },
  {
    title: "commonmark-helpers is out!",
    url: "/commonmark-helpers-release/",
    time: "May 10, 2015"
  },
  {
    title: "Renaming experience",
    url: "/renaming-experience/",
    time: "May 5, 2015"
  },
  {
    title: "Every technical article must have publish date",
    url: "/articles-dates/",
    time: "April 30, 2015"
  },
  {
    title: "Speed up your development with npm init command",
    url: "/npm-init/",
    time: "April 21, 2015"
  },
  {
    title: "Minimum viable blog",
    url: "/mvb/",
    time: "April 20, 2015"
  }
];

export default () => (
  <>
    <Meta
      title="Vladimir Starkov"
      description="Frontend blog by Vladimir Starkov"
    />
    <h1>Vladimir Starkov</h1>
    <nav>
      <Link href="/about/" prefetch>
        <a>About</a>
      </Link>
      {", "}
      <Link href="/talks/" prefetch>
        <a>Talks</a>
      </Link>
      {" and "}
      <a
        href="https://www.linkedin.com/in/iamstarkov"
        target="_blank"
        rel="noopener"
      >
        LinkedIn
      </a>
      {" • "}
      <a
        href="https://google.com/?q=site:iamstarkov.com+smth"
        target="_blank"
        rel="noopener"
      >
        search "smth"
      </a>
      <br />
      <a href="https://twitter.com/iamstarkov" target="_blank" rel="noopener">
        Follow me on Twitter
      </a>
    </nav>
    <br />
    <article>
      <ul className="list">
        {articlesList.map((x, i) => (
          <li key={x.url} className="list__item">
            <Link href={x.url} prefetch={i <= 2}>
              <a>{x.title}</a>
            </Link>
            <time>{x.time}</time>
          </li>
        ))}
      </ul>
    </article>
  </>
);
