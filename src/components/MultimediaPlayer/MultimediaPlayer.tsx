import React, { useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../../style.css';
import './styles.css';

type videoType = 'mp4' | 'webm' | 'youtube';
type audioType = 'mp3' | 'ogg';
type captionType = 'text/html' | 'application/ttml+xml';

type sourceType = {
  type: videoType | audioType | null;
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
  trackSrcLang?: string;
  /** captions language longform for displaying to user */
  trackLabel?: string;
  /** track source URL */
  trackSrc?: string;
  /** track data type, MIME ('text/html' or 'application/ttml+xml') */
  trackDataType?: captionType;
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
  sources = [{ type: null, source: '' }],
  trackSrcLang = '',
  trackLabel = '',
  trackSrc = '',
  trackDataType = 'text/html',
  cuePoints = [],
  children,
}: MultimediaPlayerProps) => {
  const videoPlayer = useRef<HTMLVideoElement>(null);
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
              <source type={`video/${type}`} key={type + source} src={source} />
            ) : (
              'ERROR: invalid source'
            )
          )}
          <track
            src={trackSrc}
            kind="captions"
            data-type={trackDataType}
            srcLang={trackSrcLang}
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
              key={name + time}
              className="btn btn-info cuepoint"
              type="button"
              data-cuepoint={time}
              onClick={() => {
                const vid = videoPlayer.current;
                if (vid && buttonTime >= 0) {
                  vid.currentTime = buttonTime;
                }
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
        <AudioPlayer
          src={sources[0].source}
          showJumpControls={false}
          defaultCurrentTime="00:00:00"
          defaultDuration="--:--:--"
          showFilledProgress={false}
          volumeJumpStep={0.05}
          customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
          customAdditionalControls={[
            RHAP_UI.MAIN_CONTROLS,
            <p style={{ margin: '5px' }} />,
            RHAP_UI.VOLUME,
            <p style={{ margin: '15px' }} />,
            RHAP_UI.CURRENT_TIME,
            <p style={{ margin: '10px', color: 'white' }}>/</p>,
            RHAP_UI.DURATION,
          ]}
          customControlsSection={[RHAP_UI.ADDITIONAL_CONTROLS]}
          customIcons={{
            play: (
              <span className="glyphicon glyphicon-play">
                <span className="wb-inv">Play</span>
              </span>
            ),
            pause: (
              <span className="glyphicon glyphicon-pause">
                <span className="wb-inv">Pause</span>
              </span>
            ),
            volume: (
              <span className="glyphicon glyphicon-volume-up">
                <span className="wb-inv">Mute</span>
              </span>
            ),
            volumeMute: (
              <span className="glyphicon glyphicon-volume-off">
                <span className="wb-inv">Unmute</span>
              </span>
            ),
          }}
        />
        <figcaption>{figCaption}</figcaption>
      </figure>
    </span>
  ) : sources[0].type === 'youtube' ? (
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
  ) : (
    <p />
  );
};
MultimediaPlayer.displayName = 'MultimediaPlayer';

export default MultimediaPlayer;
