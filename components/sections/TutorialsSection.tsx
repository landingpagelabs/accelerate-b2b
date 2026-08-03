'use client';

import { useState } from 'react';

function videoId(url: string): string {
  if (!url) return '';
  const embed = url.match(/\/embed\/([\w-]+)/);
  if (embed) return embed[1];
  const short = url.match(/youtu\.be\/([\w-]+)/);
  if (short) return short[1];
  const watch = url.match(/[?&]v=([\w-]+)/);
  if (watch) return watch[1];
  return '';
}

function toEmbed(url: string): string {
  if (!url) return '';
  const id = videoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';

/**
 * Click-to-load YouTube facade.
 *
 * Rendering the iframes eagerly pulled in two full copies of YouTube's player (~1.3MB of
 * JS) and ~90 third-party requests before the page had even painted. We now show the
 * poster image and only mount the real iframe once the visitor asks for the video —
 * the same approach already used by HeroInlineVideo, VideoModal and VslModal.
 *
 * The width/height props are kept identical to the original markup so the desktop flex
 * layout is unchanged.
 */
function VideoFacade({
  url,
  width,
  height,
  className,
}: {
  url: string;
  width: string;
  height: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const id = videoId(url);

  if (playing) {
    return (
      <iframe
        width={width}
        height={height}
        src={`${toEmbed(url)}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow={allow}
        allowFullScreen
        className={className}
      />
    );
  }

  // maxresdefault is 16:9 and matches the player box; it does not exist for every
  // upload, so fall back to the always-present hqdefault.
  const poster = id
    ? `https://i.ytimg.com/vi/${id}/${posterFailed ? 'hqdefault' : 'maxresdefault'}.jpg`
    : '';

  return (
    <button
      type="button"
      className={`video-facade${className ? ` ${className}` : ''}`}
      // The design width is passed as a custom property rather than an inline `width`, so
      // the actual width declaration lives in the stylesheet and the mobile media query can
      // still override it. An inline width would win over the media query and leave these
      // stuck at their desktop size (the old iframe used a width *attribute*, which CSS beats).
      style={
        {
          '--facade-w': `${width}px`,
          aspectRatio: `${width} / ${height}`,
        } as React.CSSProperties
      }
      onClick={() => setPlaying(true)}
      aria-label="Play video"
    >
      {poster && (
        <img
          className="video-facade__poster"
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setPosterFailed(true)}
        />
      )}
      <span className="video-facade__play" aria-hidden="true">
        <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M66.52 7.74a8.03 8.03 0 0 0-5.65-5.7C55.79 1 34 1 34 1S12.21 1 7.13 2.04a8.03 8.03 0 0 0-5.65 5.7C.5 12.85.5 24 .5 24s0 11.15.98 16.26a8.03 8.03 0 0 0 5.65 5.7C12.21 47 34 47 34 47s21.79 0 26.87-1.04a8.03 8.03 0 0 0 5.65-5.7C67.5 35.15 67.5 24 67.5 24s0-11.15-.98-16.26Z"
            fill="#ED1D24"
          />
          <path d="M27.2 33.6 45.6 24 27.2 14.4v19.2Z" fill="white" />
        </svg>
      </span>
    </button>
  );
}

export default function TutorialsSection({ section }: { section: any }) {
  const smallVideos: string[] = section.smallVideos || [];

  return (
    <section className="tutorials" id="tutorials">
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
                  <VideoFacade url={section.bigVideoUrl} width="674" height="380" />
                </div>
              )}

              {smallVideos.length > 0 && (
                <div className="tutorials_small-video-flex">
                  {smallVideos.map((url, i) => (
                    <VideoFacade key={i} url={url} width="207" height="117" />
                  ))}
                </div>
              )}
            </div>

            {section.ctaText && (
              // Opens in a new tab: it points off-site at the YouTube channel, and losing
              // the page mid-funnel to go and watch videos is the wrong trade.
              <a
                className="tutorials_cta"
                href={section.ctaUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
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
