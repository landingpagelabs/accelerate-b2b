function toEmbed(url: string): string {
  if (!url) return "";
  // already an embed URL
  if (url.includes("/embed/")) return url;
  // youtu.be/<id>
  const short = url.match(/youtu\.be\/([\w-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  // youtube.com/watch?v=<id>
  const watch = url.match(/[?&]v=([\w-]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

const allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

export default function TutorialsSection({ section }: { section: any }) {
  const smallVideos: string[] = section.smallVideos || [];

  return (
    <section className="tutorials">
      <div className="padding-global">
        <div className="container-default">
          <div className="tutorials_wrapper">
            {section.heading && (
              <div className="tutorials_head">
                <h2 className="title-h2">{section.heading}</h2>
              </div>
            )}
            <div className="tutorials_video">
              {section.bigVideoUrl && (
                <div className="tutorials_big-video">
                  <iframe width="673.61" height="380" src={toEmbed(section.bigVideoUrl)} title="YouTube video player" frameBorder="0" allow={allow} allowFullScreen />
                </div>
              )}

              {smallVideos.length > 0 && (
                <div className="tutorials_small-video-flex">
                  {smallVideos.map((url, i) => (
                    <iframe key={i} width="207" height="117" src={toEmbed(url)} title="YouTube video player" frameBorder="0" allow={allow} allowFullScreen />
                  ))}
                </div>
              )}
            </div>

            {section.ctaText && (
              <a className="tutorials_cta" href={section.ctaUrl || "#"}>
                <p className="text-body-large white">{section.ctaText}</p>
                <svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M26.4357 2.94057C26.1252 1.78317 25.2104 0.871521 24.0487 0.562183C21.9431 1.90735e-06 13.4999 0 13.4999 0C13.4999 0 5.05687 1.90735e-06 2.95123 0.562183C1.78963 0.871521 0.874675 1.78317 0.564219 2.94057C0 5.03859 0 9.41576 0 9.41576C0 9.41576 0 13.7931 0.564219 15.891C0.874675 17.0484 1.78963 17.9601 2.95123 18.2693C5.05687 18.8317 13.4999 18.8317 13.4999 18.8317C13.4999 18.8317 21.9431 18.8317 24.0487 18.2693C25.2104 17.9601 26.1252 17.0484 26.4357 15.891C27 13.7931 27 9.41576 27 9.41576C27 9.41576 27 5.03859 26.4357 2.94057Z"
                    fill="#ED1D24"
                  />
                  <path d="M10.8008 13.4513L17.8154 9.416L10.8008 5.38058V13.4513Z" fill="white" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
