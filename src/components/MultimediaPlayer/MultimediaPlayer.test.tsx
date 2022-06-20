import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import MultimediaPlayer from '@components/MultimediaPlayer';
import ShareWidget from '@components/ShareWidget';

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};

describe('MultimediaPlayer Tests', () => {
  const MultimediaPlayerMessage = 'Hello World';
  describe('MultimediaPlayer source Tests', () => {
    test('mp4', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('src', 'https://hi.mp4');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('type', 'video/mp4');
    });
    test('webm', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'webm', source: 'https://hi.webm' }]}
          share="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('src', 'https://hi.webm');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('type', 'video/webm');
    });
    test('invalid', () => {
      render(
        <MultimediaPlayer
          sources={[
            { type: 'webm', source: 'https://hi.webm' },
            { type: 'mp3', source: 'https://hi.mp3' },
          ]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('src', 'https://hi.webm');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('type', 'video/webm');
    });
    test('mp3', () => {
      render(
        <MultimediaPlayer
          sources={[
            {
              type: 'mp3',
              source:
                'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.mp3',
            },
          ]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('audio')[0]
      ).toHaveAttribute(
        'src',
        'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.mp3'
      );
    });
    test('ogg', () => {
      render(
        <MultimediaPlayer
          sources={[
            {
              type: 'mp3',
              source:
                'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.ogg',
            },
          ]}
          share="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('audio')[0]
      ).toHaveAttribute(
        'src',
        'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.ogg'
      );
    });
    test('youtube', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
          share="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('iframe')[0]
      ).toHaveAttribute('src', 'https://hi.youtube');
    });
    test('youtube no shareURL', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('iframe')[0]
      ).toHaveAttribute('src', 'https://hi.youtube');
    });
    test('empty', () => {
      render(<MultimediaPlayer>{MultimediaPlayerMessage}</MultimediaPlayer>);
    });
  });
  describe('MultimediaPlayer shareWidget Tests', () => {
    test('mp4 raw', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}
          share={
            <ShareWidget
              shareLinkText="Share this video"
              modalTitle="Share this video"
              url="hello"
              filter={[
                'Email',
                'Facebook',
                'Blogger',
                'LinkedIn',
                'Pinterest',
                'reddit',
                'tumblr',
                'WhatsApp',
                'Yahoo Mail',
                'Twitter',
              ]}
            />
          }
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('src', 'https://hi.mp4');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('type', 'video/mp4');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Share this video');
    });
    test('webm french', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'webm', source: 'https://hi.webm' }]}
          share="thisIsALink"
          french
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('src', 'https://hi.webm');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('source')[0]
      ).toHaveAttribute('type', 'video/webm');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Partagez cette vidéo');
    });
    test('mp3 raw', () => {
      render(
        <MultimediaPlayer
          sources={[
            {
              type: 'mp3',
              source:
                'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.mp3',
            },
          ]}
          share={
            <ShareWidget
              shareLinkText="Share this audio file"
              modalTitle="Share this audio file"
              url="hello"
              filter={[
                'Email',
                'Facebook',
                'Blogger',
                'LinkedIn',
                'Pinterest',
                'reddit',
                'tumblr',
                'WhatsApp',
                'Yahoo Mail',
                'Twitter',
              ]}
            />
          }
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('audio')[0]
      ).toHaveAttribute(
        'src',
        'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.mp3'
      );
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Share this audio file');
    });
    test('ogg french', () => {
      render(
        <MultimediaPlayer
          sources={[
            {
              type: 'mp3',
              source:
                'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.ogg',
            },
          ]}
          share="thisIsALink"
          french
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('audio')[0]
      ).toHaveAttribute(
        'src',
        'https://www.archive.org/download/RideOfTheValkyries/ride_of_the_valkyries_2.ogg'
      );
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Partagez ce fichier audio');
    });
    test('youtube raw', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
          share={
            <ShareWidget
              shareLinkText="Share this video"
              modalTitle="Share this video"
              url="hello"
              filter={[
                'Email',
                'Facebook',
                'Blogger',
                'LinkedIn',
                'Pinterest',
                'reddit',
                'tumblr',
                'WhatsApp',
                'Yahoo Mail',
                'Twitter',
              ]}
            />
          }
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('iframe')[0]
      ).toHaveAttribute('src', 'https://hi.youtube');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Share this video');
    });
    test('youtube french', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
          share="thisIsALink"
          french
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('iframe')[0]
      ).toHaveAttribute('src', 'https://hi.youtube');
      expect(
        screen
          .getByText(MultimediaPlayerMessage)
          .getElementsByTagName('button')[0].innerHTML
      ).toContain('Partagez cette vidéo');
    });
    test('empty', () => {
      render(<MultimediaPlayer>{MultimediaPlayerMessage}</MultimediaPlayer>);
    });
  });
  describe('MultimediaPlayer video Tests', () => {
    test('click cue point button', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}
          cuePoints={[
            { name: 'End of Intro', time: '45s' },
            { name: '', time: '01:10' },
            { name: '', time: '5' },
            { name: '', time: '9:06:10' },
          ]}
          figCaption={<p>Example Video</p>}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cue point - 01:10'));
      expect(
        screen.getByText('Hello World').getElementsByTagName('button')[3]
      ).toBeInTheDocument();
    });
    test('click cue point button, no video player error', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}
          cuePoints={[
            { name: 'End of Intro', time: '45s' },
            { name: '', time: '01:10' },
            { name: '', time: '5' },
            { name: '', time: '-1' },
          ]}
          figCaption={<p>Example Video</p>}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
      // document.getElementsByTagName('video')[0].remove();
      fireEvent.click(screen.getByText('Cue point - -1'));
      expect(
        screen.getByText('Hello World').getElementsByTagName('button')[3]
      ).toBeInTheDocument();
    });
  });
});
