import { Meta } from '../components';

export default () => <>
  <Meta
    title="Vladimir Starkov"
    description="Frontend blog by Vladimir Starkov"
  />

  <h1>
    Vladimir Starkov
  </h1>

  <nav>
    <a href="/about"> About </a>
    {", "}
    <a href="/talks"> Talks </a>
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
