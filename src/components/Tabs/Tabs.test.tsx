import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Tabs from '@components/Tabs';

describe('Tabs', () => {
  describe('TabPanel component tests', () => {
    test('general tabPanel', () => {
      render(
        <Tabs.Panel id="hi" title="tab one">
          <p>hello there</p>
        </Tabs.Panel>
      );
      expect(screen.getByText('hello there').closest('div')).toHaveClass(
        'tgl-panel'
      );
      expect(screen.getByText('hello there').closest('div')).toHaveAttribute(
        'role',
        'tabpanel'
      );
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).toHaveClass('wb-tab-panel');
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).toHaveAttribute('id', 'hi');
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).not.toHaveAttribute('open');
    });

    test('empty open tabPanel', () => {
      render(
        <Tabs.Panel id="hi" open>
          <p>hello there</p>
        </Tabs.Panel>
      );
      expect(screen.getByText('hello there').closest('div')).toHaveClass(
        'tgl-panel'
      );
      expect(screen.getByText('hello there').closest('div')).toHaveAttribute(
        'role',
        'tabpanel'
      );
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).toHaveClass('wb-tab-panel');
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).toHaveAttribute('id', 'hi');
      expect(
        screen.getByText('hello there').parentNode?.parentNode
      ).toHaveAttribute('open');
    });
  });
  describe('Tabs component', () => {
    test('general Tabs component', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two">
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      expect(screen.getByText('text')).toBeInTheDocument();
      expect(screen.getByText('more_text')).toBeInTheDocument();
      expect(screen.getByText('text').parentNode).toHaveAttribute('id', 'hi');
      expect(screen.getByText('more_text').parentNode).toHaveAttribute(
        'id',
        'hello'
      );
      expect(
        screen.getByText('text').closest('.wb-tabs')?.childNodes[0]
      ).toHaveAttribute('role', 'tablist');
      expect(
        screen.getByText('text').closest('.wb-tabs')?.childNodes[0]
      ).toHaveClass('generated');
    });
    test('Tabs ignoreSession', () => {
      render(
        <Tabs ignoreSession id="id">
          hi
        </Tabs>
      );
      expect(screen.getByText('hi')).toHaveClass('tabpanels');
      expect(screen.getByText('hi').parentNode).toHaveClass('ignore-session');
    });
  });
  describe('Tabs component functions', () => {
    test('Tabs init function', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two">
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      window.dispatchEvent(new Event('load'));
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0]
      ).toHaveAttribute('role', 'presentation');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('href', '#hi');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('role', 'tab');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[1]
      ).toHaveAttribute('role', 'presentation');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[1].childNodes[0]
      ).toHaveAttribute('href', '#hello');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[1].childNodes[0]
      ).toHaveAttribute('role', 'tab');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[1].childNodes[0]
      ).toHaveAttribute('tabIndex', '-1');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[1].childNodes[0]
      ).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('more_text').parentNode).toHaveClass('noheight');
      expect(screen.getByText('more_text').parentNode).not.toHaveAttribute(
        'open'
      );
      expect(screen.getByText('more_text').parentNode).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(screen.getByText('more_text').parentNode).toHaveAttribute(
        'aria-hidden',
        'true'
      );
      expect(screen.getByText('more_text')).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(screen.getByText('more_text')).toHaveAttribute(
        'aria-hidden',
        'true'
      );

      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0]?.childNodes[0]
      ).toHaveClass('active');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('role', 'tab');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('tabIndex', '0');
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0]
      ).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('text').parentNode).not.toHaveAttribute('out');
      expect(screen.getByText('text').parentNode).not.toHaveAttribute(
        'noheight'
      );
      expect(screen.getByText('text').parentNode).toHaveAttribute('open');
      expect(screen.getByText('text').parentNode).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByText('text').parentNode).toHaveAttribute(
        'aria-hidden',
        'false'
      );
      expect(screen.getByText('text')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('text')).toHaveAttribute('aria-hidden', 'false');
    });
    test('tabs open new tab via list, and open tag', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      fireEvent.click(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0] as Element
      );
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
    });
    test('tabs resize large', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0] as Element
      );
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
    });
    test('tabs resize small', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0] as Element
      );
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
      expect(screen.getByText('text').parentNode).not.toHaveClass('fade');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('fade');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('out');
    });
    test('tabs resize small then back to large', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0] as Element
      );
      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
      expect(screen.getByText('text').parentNode).toHaveClass('fade');
      expect(screen.getByText('more_text').parentNode).toHaveClass('fade');
      expect(screen.getByText('more_text').parentNode).toHaveClass('out');
    });
    test('tabs resize small, click on closed panel', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(
        screen.getByText('text').parentNode?.parentNode
          ?.childNodes[0] as Element
      );
      expect(screen.getByText('text').parentNode).toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
    });
    test('tabs resize small, click on open panel', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(
        screen.getByText('more_text').parentNode?.childNodes[0] as Element
      );
      expect(screen.getByText('text').parentNode).not.toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).not.toHaveClass('in');
    });
  });
  describe('Tabs component eventualities', () => {
    test('Tabs init function with missing panel id', () => {
      render(
        <Tabs id="unique">
          <details aria-hidden="true">
            <summary>tab one</summary>
            <div className="tgl-panel" role="tabpanel" aria-hidden="true">
              text
            </div>
          </details>
          <Tabs.Panel id="#hello" title="tab two" open>
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      screen
        .getByText('text')
        .closest('details')
        ?.classList.add('wb-tab-panel', 'out', 'noheight');
      window.dispatchEvent(new Event('load'));
      expect(
        screen.getByText('text').parentNode?.parentNode?.parentNode
          ?.childNodes[0].childNodes[0].childNodes[0] as Element
      ).toHaveAttribute('href', '#hello');
    });
    test('click panel 2', () => {
      render(
        <Tabs id="unique">
          <Tabs.Panel id="hi" title="tab one">
            text
          </Tabs.Panel>
          <Tabs.Panel id="hello" title="tab two">
            more_text
          </Tabs.Panel>
        </Tabs>
      );
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      fireEvent.click(screen.getByText('more_text').parentNode as Element);
      expect(screen.getByText('text').parentNode).not.toHaveClass('in');
      expect(screen.getByText('more_text').parentNode).toHaveClass('in');
    });
  });
});
