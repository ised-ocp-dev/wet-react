import React, { useRef } from 'react';
import '../../style.css';

type videoType = 'mp4' | 'webm' | 'youtube';
type audioType = 'mp3' | 'ogg';
type captionType = 'text/html' | 'application/ttml+xml';

type sourceType = {
  type: videoType | audioType;
  source: string;
};
type cuePointType = {
  name: string;
  time: string;
};

export interface MultimediaPlayerProps
  extends React.HTMLAttributes<HTMLElement> {
  /** optional url to share multimedia */
  shareURL?: string;
  /** title of video/audio. Can contain link or summary of transcript, if available */
  figCaption?: React.ReactNode;
  /** URL for video poster */
  poster?: string;
  /** title of video */
  title?: string;
  /** array of source links, each containing source (url) and type (MIME) ('mp4', 'webm', 'youtube', 'mp3', 'ogg') */
  sources?: sourceType[];
  /** captions language shortform (en, fr, sp...) */
  trackSrclang?: string;
  /** captions language longform for displaying to user */
  trackLabel?: string;
  /** track source URL */
  trackSrc?: captionType;
  /** track data type, MIME ('text/html' or 'application/ttml+xml') */
  trackDataType?: string;
  /** array of cue points, each containing name (text) and time ('78s', '1:18') */
  cuePoints?: cuePointType[];
  /** Content of heading */
  children?: React.ReactNode;
}

const MultimediaPlayer = ({
  shareURL = '',
  figCaption = '',
  poster = '',
  title = '',
  sources = [],
  trackSrclang = '',
  trackLabel = '',
  trackSrc = 'text/html',
  trackDataType = '',
  cuePoints = [],
  children,
}: MultimediaPlayerProps) => {
  const videoPlayer = useRef<HTMLVideoElement>(null);
  function setTime(tim: number) {
    const vid = videoPlayer.current;
    if (vid) {
      vid.currentTime = tim;
    }
  }
  return sources[0].type === 'mp4' || sources[0].type === 'webm' ? (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareURL === '' ? '' : `{"shareUrl": "${shareURL}"}`}
      >
        <video poster={poster} title={title} controls ref={videoPlayer}>
          {sources.map(({ type, source }) =>
            type === 'mp4' || type === 'webm' ? (
              <source type={`video/${type}`} src={source} />
            ) : (
              'ERROR: invalid source'
            )
          )}
          <track
            src={trackSrc}
            kind="captions"
            data-type={trackDataType}
            srcLang={trackSrclang}
            label={trackLabel}
          />
        </video>
        {cuePoints.map(({ name, time }) => {
          const timeSplit = time.split(':');
          const buttonTime =
            time.slice(-1).toLowerCase() === 's'
              ? Number(time.slice(0, -1))
              : timeSplit.length === 1
              ? Number(timeSplit[0])
              : timeSplit.length === 2
              ? Number(+timeSplit[0] * 60 + +timeSplit[1])
              : Number(+timeSplit[0]) * 60 * 60 +
                +timeSplit[1] * 60 +
                +timeSplit[2];
          return (
            <button
              key={name}
              className="btn btn-info cuepoint"
              type="button"
              data-cuepoint={time}
              onClick={() => {
                setTime(buttonTime);
              }}
            >
              {name === '' ? 'Cue point' : name} - {time}
            </button>
          );
        })}
        <figcaption>{figCaption}</figcaption>
      </figure>
    </span>
  ) : sources[0].type === 'mp3' || sources[0].type === 'ogg' ? (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareURL === '' ? '' : `{"shareUrl": "${shareURL}"}`}
      >
        <audio title={title} controls>
          {sources.map(({ type, source }) =>
            type === 'mp3' || type === 'ogg' ? (
              <source type={`audio/${type}`} src={source} />
            ) : (
              'ERROR: invalid source'
            )
          )}
          <track kind="captions" />
        </audio>
        <figcaption>{figCaption}</figcaption>
      </figure>
    </span>
  ) : (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareURL === '' ? '' : `{"shareUrl": "${shareURL}"}`}
      >
        <iframe
          title={title}
          src={sources[0].source}
          style={{ height: 'calc(100vh/1.777777778)' }}
        />
        <figcaption>{figCaption}</figcaption>
      </figure>
    </span>
  );
};
MultimediaPlayer.displayName = 'MultimediaPlayer';

export default MultimediaPlayer;
