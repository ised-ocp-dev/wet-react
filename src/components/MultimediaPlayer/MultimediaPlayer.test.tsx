import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import MultimediaPlayer from '@components/MultimediaPlayer';

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
    });
    test('webm', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'webm', source: 'https://hi.webm' }]}
          shareURL="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('invalid', () => {
      render(
        <MultimediaPlayer
          sources={[
            { type: 'webm', source: 'https://hi.webm' },
            { type: 'mp3', source: 'https://hi.mp3' },
          ]}
          shareURL="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('mp3', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp3', source: 'https://hi.mp3' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('ogg', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'mp3', source: 'https://hi.ogg' }]}
          shareURL="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('youtube', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
          shareURL="thisIsALink"
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
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
    });
  });
});
