import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';

import SessionTimeout from '@components/SessionTimeout';

describe('SessionTimeout', () => {
  describe('Test SessionTimeout Rendering', () => {
    test('renders the basic SessionTimeout component', () => {
      render(<SessionTimeout />);
    });
    test('renders the SessionTimeout component with custom values', () => {
      render(
        <SessionTimeout
          french
          sessionTime={10}
          inactivityTime={5}
          logoutURL="hi"
          reactionTime={3}
        />
      );
    });
  });
  describe('Test SessionTimeout timers', () => {
    jest.useFakeTimers();
    test('inactivity wait', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} />
          <p>hi</p>
        </span>
      );
      act(() => {
        jest.advanceTimersByTime(2);
      });
    });
    test('session wait', () => {
      render(
        <span>
          <SessionTimeout sessionTime={0.001} />
          <p>hi</p>
        </span>
      );
      act(() => {
        jest.advanceTimersByTime(2);
      });
    });
    test('session wait reaction wait', () => {
      render(
        <span>
          <SessionTimeout sessionTime={0.001} reactionTime={0.001} />
          <p>hi</p>
        </span>
      );
      act(() => {
        jest.advanceTimersByTime(3);
      });
    });
    test('keyPress and wait', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} />
          <p>hi</p>
        </span>
      );
      fireEvent.keyDown(screen.getByText('hi'), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      act(() => {
        jest.advanceTimersByTime(2);
      });
    });
    test('mouseMove and wait', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} />
          <p>hi</p>
        </span>
      );
      fireEvent.mouseMove(screen.getByText('hi'));
      act(() => {
        jest.advanceTimersByTime(2);
      });
    });
  });
  describe('Test SessionTimeout popup', () => {
    jest.useFakeTimers();
    test('popup continue session', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} reactionTime={0.001} />
        </span>
      );
      act(() => {
        jest.advanceTimersByTime(3);
      });
      fireEvent.click(document.getElementsByTagName('button')[0]);
    });
    test('popup end session', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} reactionTime={0.001} />
        </span>
      );
      act(() => {
        jest.advanceTimersByTime(3);
      });
      fireEvent.click(document.getElementsByTagName('button')[1]);
    });
  });
});
