import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import Tabs from '@components/Tabs';

describe('Tabs component', () => {
  test('general Tabs component', () => {
    render(
      <Tabs
        id="uniquevalue"
        panels={[{ title: 'tab one', id: 'text1', content: <p>tabContent</p> }]}
      />
    );
    expect(screen.getByText('tabContent')).toBeInTheDocument();
    expect(screen.getByText('tabContent').closest('details')).toHaveAttribute(
      'title',
      'tab one'
    );
    expect(screen.getByText('tab one')).toHaveClass('active nav-link');
    expect(screen.getByText('tab one').closest('li')).toHaveClass(
      'active nav-item'
    );
    expect(screen.getByText('tab one').closest('ul')).toHaveClass('generated');
    expect(
      screen.getByText('tab one').parentNode?.parentNode?.parentNode
    ).toHaveClass('wb-tabs tabs-acc');
  });
  test('Tabs component no id', () => {
    render(
      <Tabs
        panels={[{ title: 'tab one', id: 'text1', content: <p>tabContent</p> }]}
      />
    );
    expect(screen.getByText('tabContent')).toBeInTheDocument();
    expect(screen.getByText('tabContent').closest('details')).toHaveAttribute(
      'title',
      'tab one'
    );
    expect(screen.getByText('tab one')).toHaveClass('active nav-link');
    expect(screen.getByText('tab one').closest('li')).toHaveClass(
      'active nav-item'
    );
    expect(screen.getByText('tab one').closest('ul')).toHaveClass('generated');
    expect(
      screen.getByText('tab one').parentNode?.parentNode?.parentNode
    ).toHaveClass('wb-tabs tabs-acc');
  });
  test('Tabs component swap tab', () => {
    render(
      <Tabs
        id="uniquevalue"
        panels={[
          { title: 'tab one', id: 'text1', content: <p>tabContent</p> },
          { title: 'tab two', id: 'text2', content: <p>tabContent2</p> },
        ]}
      />
    );
    expect(screen.getByText('tab one')).toBeInTheDocument();
    expect(screen.getByText('tab two')).toBeInTheDocument();
    expect(screen.getByText('tab one')).toHaveClass('nav-link active');
    expect(screen.getByText('tab two')).toHaveClass('nav-link');
    fireEvent.click(screen.getByText('tab two'));
    expect(screen.getByText('tab one')).toHaveClass('nav-link');
    expect(screen.getByText('tab two')).toHaveClass('nav-link active');
  });
  test('Tabs component mainPanel', () => {
    render(
      <Tabs
        id="uniquevalue"
        mainPanel="text2"
        panels={[
          { title: 'tab one', id: 'text1', content: <p>tabContent</p> },
          { title: 'tab two', id: 'text2', content: <p>tabContent2</p> },
        ]}
      />
    );
    expect(screen.getByText('tab one')).toBeInTheDocument();
    expect(screen.getByText('tab two')).toBeInTheDocument();
    expect(screen.getByText('tab two')).toHaveClass('nav-link active');
    expect(screen.getByText('tab one')).toHaveClass('nav-link');
  });
  test('Tabs load in small size', () => {
    act(() => {
      global.innerWidth = 990;
      global.dispatchEvent(new Event('resize'));
    });
    render(
      <Tabs
        id="uniquevalue"
        panels={[
          { title: 'tab one', id: 'text1', content: <p>tabContent</p> },
          { title: 'tab two', id: 'text2', content: <p>tabContent2</p> },
        ]}
      />
    );
    expect(screen.getByText('tab one').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tab two').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tabContent')).toBeInTheDocument();
    expect(screen.getByText('tabContent2')).toBeInTheDocument();
    expect(screen.getByText('tabContent').parentNode).toHaveClass('tgl-panel');
    expect(screen.getByText('tabContent2').parentNode).toHaveClass('tgl-panel');
  });
  test('Tabs resize', () => {
    render(
      <Tabs
        id="uniquevalue"
        panels={[
          { title: 'tab one', id: 'text1', content: <p>tabContent</p> },
          { title: 'tab two', id: 'text2', content: <p>tabContent2</p> },
        ]}
      />
    );
    expect(screen.getByText('tab one')).toBeInTheDocument();
    expect(screen.getByText('tab two')).toBeInTheDocument();
    act(() => {
      global.innerWidth = 990;
      global.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByText('tab one').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tab two').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tabContent')).toBeInTheDocument();
    expect(screen.getByText('tabContent2')).toBeInTheDocument();
    expect(screen.getByText('tabContent').parentNode).toHaveClass('tgl-panel');
    expect(screen.getByText('tabContent2').parentNode).toHaveClass('tgl-panel');
  });
  test('Tabs resize swap tab', () => {
    render(
      <Tabs
        id="uniquevalue"
        panels={[
          { title: 'tab one', id: 'text1', content: <p>tabContent</p> },
          { title: 'tab two', id: 'text2', content: <p>tabContent2</p> },
        ]}
      />
    );
    expect(screen.getByText('tab one')).toBeInTheDocument();
    expect(screen.getByText('tab two')).toBeInTheDocument();
    act(() => {
      global.innerWidth = 990;
      global.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByText('tab one').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tab two').closest('summary')).toHaveClass(
      'wb-toggle tgl-tab wb-init wb-toggle-inited'
    );
    expect(screen.getByText('tabContent')).toBeInTheDocument();
    expect(screen.getByText('tabContent2')).toBeInTheDocument();
    expect(screen.getByText('tabContent').parentNode).toHaveClass('tgl-panel');
    expect(screen.getByText('tabContent2').parentNode).toHaveClass('tgl-panel');
    expect(screen.getByText('tabContent').closest('details')).toHaveAttribute(
      'open'
    );
    expect(
      screen.getByText('tabContent2').closest('details')
    ).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('tab two')); // for some reason this doesn't trigger the ontoggle handler...
    expect(screen.getByText('tabContent').closest('details')).toHaveAttribute(
      'open',
      ''
    );
    expect(screen.getByText('tabContent2').closest('details')).toHaveAttribute(
      'open'
    );
  });
  test('Tabs blank', () => {
    render(<Tabs />);
  });
});
