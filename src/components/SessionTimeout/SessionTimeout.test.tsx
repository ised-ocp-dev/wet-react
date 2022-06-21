import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';

import SessionTimeout from '@components/SessionTimeout';

describe('SessionTimeout', () => {
  jest.useFakeTimers();
  describe('Test SessionTimeout Rendering', () => {
    test('renders the basic SessionTimeout component', () => {
      render(<SessionTimeout />);
      act(() => {
        jest.advanceTimersByTime(15 * 60 * 1000 + 5);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
    });
    test('renders the SessionTimeout component with custom values', () => {
      render(<SessionTimeout french logoutURL="hi" reactionTime={3} />);
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(15 * 60 * 1000 + 5);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        "Avertissement d'expiration de la session"
      );
    });
  });
  describe('Test SessionTimeout timers', () => {
    test('inactivity wait', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} />
        </span>
      );
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(2);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
    });
    test('session wait', () => {
      render(
        <span>
          <SessionTimeout sessionTime={0.001} />
        </span>
      );
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(2);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
    });
    test('session wait reaction wait', () => {
      render(
        <span>
          <SessionTimeout sessionTime={0.001} reactionTime={0.001} />
          <p>hi</p>
        </span>
      );
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(3);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
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
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(2);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
    });
    test('mouseMove and wait', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} />
          <p>hi</p>
        </span>
      );
      fireEvent.mouseMove(screen.getByText('hi'));
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(2);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
    });
  });
  describe('Test SessionTimeout popup', () => {
    test('popup continue session', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} reactionTime={0.001} />
        </span>
      );
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(3);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
      expect(document.getElementsByClassName('modal-body')[0].innerHTML).toBe(
        'Your session will expire automatically soon.<br>Select "Continue session" to extend your session.'
      );
      fireEvent.click(document.getElementsByTagName('button')[0]);
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
    });
    test('popup end session', () => {
      render(
        <span>
          <SessionTimeout inactivityTime={0.001} reactionTime={0.001} />
        </span>
      );
      expect(document.getElementsByClassName('modal-title').length).toEqual(0);
      act(() => {
        jest.advanceTimersByTime(3);
      });
      expect(document.getElementsByClassName('modal-title')[0].innerHTML).toBe(
        'Session timeout warning'
      );
      fireEvent.click(document.getElementsByTagName('button')[1]);
      expect(document.getElementsByClassName('modal-title').length).toEqual(1);
    });
  });
});
