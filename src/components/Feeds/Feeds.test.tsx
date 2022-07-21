import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Feeds from '@components/Feeds';

const atomXMLFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Canada News Centre - Manitoba</title>
  <subtitle>Canada News Centre</subtitle>
  <updated>2018-10-25T08:50:38-04:00</updated>
  <link href="https://www.canada.ca/en/news/web-feeds/manitoba" rel="self" />
  <id>https://www.canada.ca/en/news.html</id>
  <logo>https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg</logo>
  <entry>
    <title>Government of Canada recognizes Eagle Urban Transition Centre in supporting First Nations children off-reserve through Jordan's Principle</title>
    <id>https://www.canada.ca/en/indigenous-services-canada/news/2018/10/government-of-canada-recognizes-eagle-urban-transition-centre-in-supporting-first-nations-children-off-reserve-through-jordans-principle.html</id>
    <summary type="html">Working in partnership with First Nations, Indigenous Services Canada is committed to providing children with the supports and services they need, when they need them.</summary>
    <author>
      <name>Indigenous Services Canada</name>
    </author>
    <updated>2018-10-19T12:06:29-04:00</updated>
    <link href="https://www.canada.ca/en/indigenous-services-canada/news/2018/10/government-of-canada-recognizes-eagle-urban-transition-centre-in-supporting-first-nations-children-off-reserve-through-jordans-principle.html" />
  </entry>
  <entry>
    <title>Robert Falcon-Ouellette, Member of Parliament for Winnipeg Centre, to highlight success of Eagle Urban Transition Centre in supporting First Nations children in Winnipeg</title>
    <id>https://www.canada.ca/en/indigenous-services-canada/news/2018/10/robert-falcon-ouellette-member-of-parliament-for-winnipeg-centre-to-highlight-success-of-eagle-urban-transition-centre-in-supporting-first-nations-.html</id>
    <summary type="html">Please be advised that MP Robert Falcon-Ouellette, on behalf of the Honourable Jane Philpott, Minister of Indigenous Services, will join Grand Chief Arlen Dumas of the Assembly of Manitoba Chiefs to highlight the success of the Eagle Urban Transition Centre in supporting First Nations children living off reserve in Winnipeg.</summary>
    <author>
      <name>Indigenous Services Canada</name>
    </author>
    <updated>2018-10-18T12:20:46-04:00</updated>
    <link href="https://www.canada.ca/en/indigenous-services-canada/news/2018/10/robert-falcon-ouellette-member-of-parliament-for-winnipeg-centre-to-highlight-success-of-eagle-urban-transition-centre-in-supporting-first-nations-.html" />
  </entry>
  <entry>
    <title>Government of Canada recognizes the National Historic Significance of the Dominion Exhibition Display Building No. 2</title>
    <id>https://www.canada.ca/en/parks-canada/news/2018/10/government-of-canada-recognizes-the-national-historic-significance-of-the-dominion-exhibition-display-building-no-2.html</id>
    <summary type="html">Government of Canada recognizes the National Historic Significance of the Dominion Exhibition Display Building No. 2</summary>
    <author>
      <name>Parks Canada</name>
    </author>
    <updated>2018-10-18T10:15:00-04:00</updated>
    <link href="https://www.canada.ca/en/parks-canada/news/2018/10/government-of-canada-recognizes-the-national-historic-significance-of-the-dominion-exhibition-display-building-no-2.html" />
  </entry>
  <entry>
    <title>Dominion Exhibition Display Building No. 2, Brandon, Manitoba</title>
    <id>https://www.canada.ca/en/parks-canada/news/2018/10/dominion-exhibition-display-building-no-2-brandon-manitoba.html</id>
    <summary type="html">Dominion Exhibition Display Building No. 2, Brandon, Manitoba</summary>
    <author>
      <name>Parks Canada</name>
    </author>
    <updated>2018-10-18T10:15:00-04:00</updated>
    <link href="https://www.canada.ca/en/parks-canada/news/2018/10/dominion-exhibition-display-building-no-2-brandon-manitoba.html" />
  </entry>
</feed>`;

const atomXMLFeedNoEntry = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>Canada News Centre - Manitoba</title>
	<subtitle>Canada News Centre</subtitle>
	<updated>2018-10-25T08:50:38-04:00</updated>
	<link href="https://www.canada.ca/en/news/web-feeds/manitoba" rel="self" />
	<id>https://www.canada.ca/en/news.html</id>
	<logo>https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg</logo>
</feed>`;

const atomJSONFeed = {
  feed: {
    title: 'Canada News Centre - Manitoba',
    subtitle: 'Canada News Centre',
    updated: '2018-10-25T08:50:38-04:00',
    link: 'https://www.canada.ca/en/news/web-feeds/manitoba',
    id: 'https://www.canada.ca/en/news.html',
    logo: 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg',

    entry: [
      {
        title:
          "Government of Canada recognizes Eagle Urban Transition Centre in supporting First Nations children off-reserve through Jordan's Principle",
        updated: '2018-10-19T12:06:29-04:00',
        link: 'https://www.canada.ca/en/indigenous-services-canada/news/2018/10/government-of-canada-recognizes-eagle-urban-transition-centre-in-supporting-first-nations-children-off-reserve-through-jordans-principle.html',
      },
      {
        title:
          'Robert Falcon-Ouellette, Member of Parliament for Winnipeg Centre, to highlight success of Eagle Urban Transition Centre in supporting First Nations children in Winnipeg',
        updated: '2018-10-18T12:20:46-04:00',
        link: 'https://www.canada.ca/en/indigenous-services-canada/news/2018/10/robert-falcon-ouellette-member-of-parliament-for-winnipeg-centre-to-highlight-success-of-eagle-urban-transition-centre-in-supporting-first-nations-.html',
      },
      {
        title:
          'Government of Canada recognizes the National Historic Significance of the Dominion Exhibition Display Building No. 2',
        updated: '2018-10-18T10:15:00-04:00',
        link: 'https://www.canada.ca/en/parks-canada/news/2018/10/government-of-canada-recognizes-the-national-historic-significance-of-the-dominion-exhibition-display-building-no-2.html',
      },
      {
        title: 'Dominion Exhibition Display Building No. 2, Brandon, Manitoba',
        updated: '2018-10-18T10:15:00-04:00',
        link: 'https://www.canada.ca/en/parks-canada/news/2018/10/dominion-exhibition-display-building-no-2-brandon-manitoba.html',
      },
    ],
  },
};

const atomJSONFeedNoEntry = {
  feed: {
    title: 'Canada News Centre - Manitoba',
    subtitle: 'Canada News Centre',
    updated: '2018-10-25T08:50:38-04:00',
    link: 'https://www.canada.ca/en/news/web-feeds/manitoba',
    id: 'https://www.canada.ca/en/news.html',
    logo: 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg',
  },
};

jest.mock('axios');

describe('Feeds Test', () => {
  describe('feedType prop test', () => {
    test('Default feedType value (XML)', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: atomXMLFeed })
      );
      const result = render(<Feeds url="https://example.atom.xml" />);
      await waitFor(() => {
        expect(result.container.querySelectorAll('li')).toHaveLength(4);
      });
    });

    test('Default feedType value (XML) - no entries', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: atomXMLFeedNoEntry })
      );
      const result = render(<Feeds url="https://example.atom.xml" />);
      await waitFor(() => {
        expect(result.container.querySelectorAll('li')).toHaveLength(1);
      });
    });

    test('JSON feedType value', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: atomJSONFeed })
      );
      const result = render(
        <Feeds url="https://example.atom.json" feedType="JSON" />
      );
      await waitFor(() => {
        expect(result.container.querySelectorAll('li')).toHaveLength(4);
      });
    });

    test('JSON feedType value - no entries', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: atomJSONFeedNoEntry })
      );
      const result = render(
        <Feeds url="https://example.atom.json" feedType="JSON" />
      );
      await waitFor(() => {
        expect(result.container.querySelectorAll('li')).toHaveLength(1);
      });
    });

    test('Tabs feedType value (Flickr)', () => {
      render(
        <Feeds
          url={{
            flickr: [
              {
                name: 'Environment Canada Flickr',
                url: 'https://www.flickr.com/photos/environmentcan',
              },
              {
                name: 'Parliament of Canada',
                url: 'https://www.flickr.com/photos/parlcanada/',
              },
            ],
          }}
          feedType="Tabs"
        />
      );
      expect(screen.getByText('Flickr')).toHaveClass('nav-link active');
      expect(screen.getByText('Environment Canada Flickr')).toBeInTheDocument();
      expect(screen.getByText('Parliament of Canada')).toBeInTheDocument();
    });

    test('Tabs feedType value (YouTube)', () => {
      render(
        <Feeds
          url={{
            youtube: [
              {
                name: 'Learn to Set up a Tent',
                url: 'https://www.youtube.com/embed/ZwgEH-Szk0k',
              },
              {
                name: 'Camping with Wildlife',
                url: 'https://www.youtube.com/embed/w5gpKajD8E0',
              },
            ],
          }}
          feedType="Tabs"
        />
      );
      expect(screen.getByText('YouTube')).toHaveClass('nav-link active');
    });
  });

  test('french prop test', () => {
    render(<Feeds url="" french />);
    expect(
      screen.getByText(
        "Désolé, nous n'avons pas pu récupérer un fil de syndication de l'URL fournie."
      )
    ).toBeInTheDocument();
  });

  test('feedLimit prop test', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: atomXMLFeed }));
    const result = render(
      <Feeds url="https://example.atom.xml" feedLimit={1} />
    );
    await waitFor(() => {
      expect(result.container.querySelectorAll('li')).toHaveLength(1);
    });
  });

  describe('Feeds Button Actions', () => {
    test('Modal pop up link and close button', async () => {
      render(
        <Feeds
          url={{
            youtube: [
              {
                name: 'Learn to Set up a Tent',
                url: 'https://www.youtube.com/embed/ZwgEH-Szk0k',
              },
            ],
          }}
          feedType="Tabs"
        />
      );

      fireEvent.click(screen.getByLabelText('Learn to Set up a Tent'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toHaveClass('modal');
      });

      fireEvent.click(screen.getByText('Close'));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    test('Modal pop up link and header close button', async () => {
      render(
        <Feeds
          url={{
            youtube: [
              {
                name: 'Parliament of Canada',
                url: 'https://www.flickr.com/photos/parlcanada/',
              },
            ],
          }}
          feedType="Tabs"
        />
      );

      fireEvent.click(screen.getByLabelText('Parliament of Canada'));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toHaveClass('modal');
      });

      fireEvent.click(screen.getByLabelText('Close'));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });
});
