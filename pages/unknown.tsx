import HomePageLayout from '../layouts/HomePageLayout';
import CodeHexUnknown from '../components/CodeHexUnknown';

export default function Unknown() {
  return (
    <HomePageLayout>
      <div className="codehex-unknown">
        <h1>Unknown list</h1>
        <CodeHexUnknown width="200px" height="200px" />
        <p>What's this?</p>
        <ul>
          <li>
            <a href="https://ja.uncyclopedia.info/wiki/Uncyclopedia:%E7%A7%80%E9%80%B8%E3%81%AA%E8%A8%98%E4%BA%8B">
              Uncyclopedia:秀逸な記事
            </a>
            <ul>
              <li>
                <a href="http://ja.uncyclopedia.info/wiki/%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82%E3%81%82!">
                  あああああああああ!
                </a>
              </li>
              <li>
                <a href="https://ja.uncyclopedia.info/wiki/%E6%81%8B%E6%84%9B">
                  恋愛
                </a>
              </li>
            </ul>
          </li>
          <li>
            <span>Wikipedia</span>
            <ul>
              <li>
                <a href="https://ja.wikipedia.org/wiki/DIY#/media/File:1-Bench-woodwork.JPG">
                  1-Bench-woodwork - DIY - Wikipedia
                </a>
              </li>
              <li>
                <a href="https://commons.wikimedia.org/wiki/File:I%27m_calling_you,_Mr._Amadeus!.jpg">
                  File:I'm calling you, Mr. Amadeus!.jpg - Wikimedia Commons
                </a>
              </li>
              <li>
                <a href="https://commons.wikimedia.org/wiki/File:Fucking,_Austria,_street_sign.jpg">
                  File:Fucking, Austria, street sign.jpg - Wikimedia Commons
                </a>
              </li>
              <li>
                <a href="https://ja.wikipedia.org/wiki/%E4%BF%BA%E3%81%AE%E5%B0%BB%E3%82%92%E3%81%AA%E3%82%81%E3%82%8D">
                  俺の尻をなめろ - Wikipedia
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://www.reddit.com/r/docker/comments/bj7icy/docker_random_container_naming/">
              r/docker - Docker random container naming
            </a>
          </li>
          <li>
            <span>Panasonic NN-E225M</span>
            <br />
            <audio className="audio" controls>
              <source src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Panasonic_NN-E225M_microwave.flac" />
              <p>You need browser which is supported to play the audio tags.</p>
            </audio>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .codehex-unknown {
          margin-left: 20px;
        }
      `}</style>
    </HomePageLayout>
  );
}
