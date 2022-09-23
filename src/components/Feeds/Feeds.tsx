import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import MultimediaPlayer from '@components/MultimediaPlayer';
import Button from '@components/Button';
import Tabs from '@components/Tabs';
import axios, { AxiosResponse } from 'axios';
import xml2js from 'xml2js';
import '../../style.css';
import './Feeds.css';

type feedTypes = 'XML' | 'JSON' | 'Tabs';

interface TabFeedEntry {
  name: string;
  url: string;
}

interface TabFeedProps {
  flickr?: TabFeedEntry[];
  youtube?: TabFeedEntry[];
}

interface Panel {
  title: string;
  content: JSX.Element[];
  id: string;
}

interface JSONFeed {
  feed?: {
    title: string;
    subtitle?: string;
    updated: string;
    link: string;
    id?: string;
    logo?: string;
    entry?: {
      title: string;
      updated: string;
      link: string;
    }[];
  };
}

interface XMLFeed {
  feed?: {
    $?: {
      xmlns?: string;
    };
    title: string[];
    subtitle?: string[];
    updated: string[];
    link: {
      $: {
        href: string;
        rel: string;
      };
    }[];
    id?: string[];
    logo?: string[];
    entry?: {
      title: string[];
      id?: string[];
      summary?: {
        _: string;
        $: {
          type: string;
        };
      }[];
      author?: {
        name: string[];
      }[];
      updated: string[];
      link: {
        $: {
          href: string;
        };
      }[];
    }[];
  };
}

export interface FeedsProps extends React.HTMLAttributes<HTMLElement> {
  /** URL to a ATOM or RSS feed. Otherwise, a list of Flickr and/or YouTube URLs to display in a tab feed. YouTube links must be embedded links (for example: https://www.youtube.com/embed/ZwgEH-Szk0k). */
  url: string | TabFeedProps;
  /** Limit on the number of ATOM or RSS feed entries to display. */
  feedLimit?: number;
  /** What the ATOM/RSS feed is writtin in ("XML" or "JSON"). Otherwise, define prop as "Tabs" to display Flickr and/or YouTube content in tab feed. */
  feedType?: feedTypes;
  /** Translates the component's text to French. */
  french?: boolean;
}

const Feeds = ({
  url,
  feedLimit,
  french = false,
  feedType = 'XML',
  ...rest
}: FeedsProps) => {
  const parsers = new xml2js.Parser();

  const [xmlFeed, setXMLFeed] = useState<XMLFeed>({});
  const [jsonFeed, setJSONFeed] = useState<JSONFeed>({});
  const [liItems, setLiItems] = useState<JSX.Element[]>();

  const [tabFeedPanels, setTabFeedPanels] = useState<Panel[]>();
  const [showModal, setShowModal] = React.useState(false);
  const [youTubeModalTitle, setYouTubeModalTitle] = useState<string>();
  const [youTubeModalURL, setYouTubeModalURL] = useState<string>();

  const closeLabel = french ? 'Fermer' : 'Close';
  const errorMessage = french
    ? "Désolé, nous n'avons pas pu récupérer un fil de syndication de l'URL fournie."
    : 'Sorry, we could not retrieve a feed from the provided URL.';

  const getYouTubeThumbnailURL = (youTubeURL: string) => {
    const videoId = youTubeURL.match(
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|v(?:i)?=))([^#]*).*/
    );
    return videoId
      ? `http://img.youtube.com/vi/${videoId[1]}/sddefault.jpg`
      : '/assets/YouTube Default Thumbnail.jpg';
  };

  const getJSONFeed = async (link: string) => {
    const response: AxiosResponse<JSONFeed, unknown> = await axios.get(link);
    return response;
  };

  const getXMLFeed = async (link: string) => {
    const response: AxiosResponse<string, unknown> = await axios.get(link);
    return response;
  };

  useEffect(() => {
    if (typeof url === 'string') {
      if (feedType === 'JSON') {
        const response: Promise<AxiosResponse<JSONFeed, unknown>> =
          getJSONFeed(url);
        response.then((res) => res.data).then((data) => setJSONFeed(data));
      }

      if (feedType === 'XML') {
        const response: Promise<AxiosResponse<string, unknown>> =
          getXMLFeed(url);
        response
          .then((res) => res.data)
          .then((data) => {
            let content;
            parsers.parseString(data, (error, result) => {
              content = result;
            });
            if (content) {
              setXMLFeed(content);
            }
          });
      }
    }

    if (typeof url !== 'string' && feedType === 'Tabs') {
      const panels = [];

      if (url.flickr) {
        const flickrContent: JSX.Element[] = [];
        url.flickr.forEach((entry, index) => {
          flickrContent.push(
            <a
              key={entry.name}
              href={entry.url}
              style={{
                backgroundColor: index % 2 === 1 ? '#f9f9f9' : undefined,
                padding: 5,
                marginTop: 5,
              }}
            >
              {entry.name}
            </a>
          );
        });

        panels.push({
          title: 'Flickr',
          content: flickrContent,
          id: 'flickrTab',
        });
      }

      if (url.youtube) {
        const youtubeContent: JSX.Element[] = [];
        url.youtube.forEach((entry, index) => {
          youtubeContent.push(
            <Button
              onClick={() => {
                setYouTubeModalURL(entry.url);
                setYouTubeModalTitle(entry.name);
                setShowModal(true);
              }}
              style={{
                margin: 5,
                backgroundColor: index % 2 === 0 ? 'white' : undefined,
              }}
              key={entry.name}
              aria-label={entry.name}
            >
              <img
                src={getYouTubeThumbnailURL(entry.url)}
                alt={entry.name}
                style={{ width: 150 }}
              />
            </Button>
          );
        });

        panels.push({
          title: 'YouTube',
          content: youtubeContent,
          id: 'youtubeTab',
        });
      }

      setTabFeedPanels(panels);
    }
  }, []);

  useEffect(() => {
    const items: JSX.Element[] = [];
    if (jsonFeed.feed && jsonFeed.feed.entry) {
      jsonFeed.feed.entry.forEach((entry, index) => {
        if (!feedLimit || index < feedLimit) {
          const title = `${entry.title}`;
          const link = `${entry.link}`;
          const date = `${entry.updated}`;

          items.push(
            <li key={link} style={{ marginBottom: 10 }}>
              <a href={link}>{title}</a>
              <small className="feeds-date" style={{ display: 'block' }}>
                <time>{date}</time>
              </small>
            </li>
          );
        }
      });

      setLiItems(items);
    } else if (jsonFeed.feed) {
      const title = `${jsonFeed.feed.title}`;
      const link = `${jsonFeed.feed.link}`;
      const date = `${jsonFeed.feed.updated}`;

      items.push(
        <li key={link} style={{ marginBottom: 10 }}>
          <a href={link}>{title}</a>
          <small className="feeds-date" style={{ display: 'block' }}>
            <time>{date}</time>
          </small>
        </li>
      );

      setLiItems(items);
    }
  }, [jsonFeed]);

  useEffect(() => {
    const items: JSX.Element[] = [];
    if (xmlFeed.feed && xmlFeed.feed.entry) {
      xmlFeed.feed.entry.forEach((entry, index) => {
        if (!feedLimit || index < feedLimit) {
          const title = `${entry.title[0]}`;
          const link = `${entry.link[0].$.href}`;
          const date = `${entry.updated[0]}`;

          items.push(
            <li key={link} style={{ marginBottom: 10 }}>
              <a href={link}>{title}</a>
              <small className="feeds-date" style={{ display: 'block' }}>
                <time>{date}</time>
              </small>
            </li>
          );
        }
      });

      setLiItems(items);
    } else if (xmlFeed.feed) {
      const title = `${xmlFeed.feed.title[0]}`;
      const link = `${xmlFeed.feed.link[0].$.href}`;
      const date = `${xmlFeed.feed.updated[0]}`;

      items.push(
        <li key={link} style={{ marginBottom: 10 }}>
          <a href={link}>{title}</a>
          <small className="feeds-date" style={{ display: 'block' }}>
            <time>{date}</time>
          </small>
        </li>
      );

      setLiItems(items);
    }
  }, [xmlFeed]);

  if (liItems) {
    return (
      <ul className="feeds-cont list-unstyled" {...rest}>
        {liItems}
      </ul>
    );
  }

  if (tabFeedPanels) {
    return (
      <>
        <Tabs id="tabFeed" panels={tabFeedPanels} {...rest} />
        <Modal
          show={showModal}
          animation={false}
          centered
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{youTubeModalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MultimediaPlayer
              sources={[{ type: 'youtube', source: `${youTubeModalURL}` }]}
              figCaption={<p>{youTubeModalTitle}</p>}
            />
          </Modal.Body>
          <Modal.Footer style={{ display: 'flex' }}>
            <Button
              variant="primary"
              onClick={() => setShowModal(false)}
              style={{ left: 0 }}
            >
              {closeLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <p>{errorMessage}</p>;
};

export default Feeds;
