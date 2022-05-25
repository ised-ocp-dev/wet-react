import React from 'react';
import { render, screen } from '@testing-library/react';

import Tabs from '@components/Tabs';

describe('Tabs', () => {
  describe('Tabs component tests', () => {
    test('general tabs', () => {
      render(
        <Tabs
          list={
            <Tabs.List>
              <Tabs.ListItem href="hi">panel 1</Tabs.ListItem>
              <Tabs.ListItem active href="higar">
                panel 2
              </Tabs.ListItem>
            </Tabs.List>
          }
        >
          <Tabs.PanelItem id="hi" summary="tab one">
            <p>hello there</p>
          </Tabs.PanelItem>
          <Tabs.PanelItem id="higar" summary="tab two" open>
            <p>obi-wan!</p>
          </Tabs.PanelItem>
        </Tabs>
      );
      expect(screen.getByText('panel 1').closest('div')).toHaveClass('wb-tabs');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass('wb-init');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'wb-tabs-inited'
      );
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'tabs-acc'
      );
    });

    test('ignoreSession', () => {
      render(
        <Tabs
          ignoreSession
          list={
            <Tabs.List>
              <Tabs.ListItem href="hi">panel 1</Tabs.ListItem>
            </Tabs.List>
          }
        >
          hello
        </Tabs>
      );
      expect(screen.getByText('hello')).toHaveClass('tabpanels');
      expect(screen.getByText('hello').closest('div')).toHaveClass('tabpanels');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'ignore-session'
      );
    });
  });
  describe('Tabs List components', () => {
    test('general List components', () => {
      render(
        <Tabs
          list={
            <Tabs.List>
              <Tabs.ListItem href="hi">panel 1</Tabs.ListItem>
              <Tabs.ListItem active href="higar">
                panel 2
              </Tabs.ListItem>
            </Tabs.List>
          }
        />
      );
      expect(screen.getByText('panel 1')).toBeInTheDocument();
      expect(screen.getByText('panel 2')).toBeInTheDocument();
      expect(screen.getByText('panel 1')).toHaveAttribute('href', '#hi');
      expect(screen.getByText('panel 1').closest('ul')).toHaveAttribute(
        'role',
        'tablist'
      );
      expect(screen.getByText('panel 1').closest('ul')).toHaveClass(
        'generated'
      );
      expect(screen.getByText('panel 2')).toHaveAttribute('href', '#higar');
      expect(screen.getByText('panel 2').closest('li')).toHaveClass('active');
    });
    test('list exceptions', () => {
      render(
        <Tabs
          list={
            <Tabs.List>
              <Tabs.ListItem href="#hi">panel 1</Tabs.ListItem>
              <Tabs.ListItem active>panel 2</Tabs.ListItem>
            </Tabs.List>
          }
        />
      );
      expect(screen.getByText('panel 1')).toBeInTheDocument();
      expect(screen.getByText('panel 2')).toBeInTheDocument();
      expect(screen.getByText('panel 1')).toHaveAttribute('href', '#hi');
      expect(screen.getByText('panel 2')).toHaveAttribute('href', '#');
    });
  });
  describe('Tabs Panel tests', () => {
    test('general Panel components', () => {
      render(
        <Tabs>
          <Tabs.PanelItem id="hi" summary="tab one">
            <p>hello there</p>
          </Tabs.PanelItem>
          <Tabs.PanelItem id="higar" summary="tab two" open>
            <p>obi-wan!</p>
          </Tabs.PanelItem>
        </Tabs>
      );
      expect(screen.getByText('hello there')).toBeInTheDocument();
      expect(screen.getByText('obi-wan!')).toBeInTheDocument();
      expect(
        screen.getByText('hello there').closest('details')
      ).toHaveAttribute('id', 'hi');
      expect(screen.getByText('obi-wan!').closest('details')).toHaveAttribute(
        'id',
        'higar'
      );
      expect(screen.getByText('obi-wan!').closest('details')).toHaveAttribute(
        'open'
      );
    });

    test('Panel exceptions', () => {
      render(
        <Tabs>
          <Tabs.PanelItem>
            <p>hello there</p>
          </Tabs.PanelItem>
        </Tabs>
      );
      expect(screen.getByText('hello there')).toBeInTheDocument();
      expect(
        screen.getByText('hello there').closest('details')
      ).toHaveAttribute('id', '');
      expect(
        screen.getByText('hello there').closest('details')
      ).not.toHaveAttribute('summary');
    });
  });
  describe('overall tests', () => {
    test('general tabs', () => {
      render(
        <Tabs
          list={
            <Tabs.List>
              <Tabs.ListItem href="hi">panel 1</Tabs.ListItem>
              <Tabs.ListItem active href="higar">
                panel 2
              </Tabs.ListItem>
            </Tabs.List>
          }
        >
          <Tabs.PanelItem id="hi" summary="tab one">
            <p>hello there</p>
          </Tabs.PanelItem>
          <Tabs.PanelItem id="higar" summary="tab two" open>
            <p>obi-wan!</p>
          </Tabs.PanelItem>
        </Tabs>
      );
      expect(screen.getByText('panel 1')).toBeInTheDocument();
      expect(screen.getByText('panel 2')).toBeInTheDocument();
      expect(screen.getByText('hello there')).toBeInTheDocument();
      expect(screen.getByText('obi-wan!')).toBeInTheDocument();
      expect(screen.getByText('panel 1')).toHaveAttribute('href', '#hi');
      expect(screen.getByText('panel 1').closest('ul')).toHaveAttribute(
        'role',
        'tablist'
      );
      expect(screen.getByText('panel 1').closest('ul')).toHaveClass(
        'generated'
      );
      expect(screen.getByText('panel 1').closest('div')).toHaveClass('wb-tabs');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass('wb-init');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'wb-tabs-inited'
      );
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'tabs-acc'
      );
      expect(screen.getByText('panel 2')).toHaveAttribute('href', '#higar');
      expect(screen.getByText('panel 2').closest('li')).toHaveClass('active');
      expect(
        screen.getByText('hello there').closest('details')
      ).toHaveAttribute('id', 'hi');
      expect(screen.getByText('obi-wan!').closest('details')).toHaveAttribute(
        'id',
        'higar'
      );
      expect(screen.getByText('obi-wan!').closest('details')).toHaveAttribute(
        'open'
      );
    });

    test('ignoreSession', () => {
      render(
        <Tabs
          ignoreSession
          list={
            <Tabs.List>
              <Tabs.ListItem href="hi">panel 1</Tabs.ListItem>
            </Tabs.List>
          }
        >
          hello
        </Tabs>
      );
      expect(screen.getByText('hello')).toHaveClass('tabpanels');
      expect(screen.getByText('hello').closest('div')).toHaveClass('tabpanels');
      expect(screen.getByText('panel 1').closest('div')).toHaveClass(
        'ignore-session'
      );
    });
  });
});
