import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import FootnoteLink from '@components/Footnote/FootnoteLink';
import FootnoteSection from '@components/Footnote/FootnoteSection';

describe('Footnote tests', () => {
  const val = '5';
  const subVal = 3;
  const ind = 'hi';
  const content = 'this is content';

  test('renders the default FootnoteLink component', () => {
    render(<FootnoteLink />);
  });
  test('renders the basic FootnoteLink component', () => {
    render(<FootnoteLink value={val} />);
    expect(screen.getByText(val)).toBeInTheDocument();
  });
  test('renders the basic FootnoteLink component with subValue', () => {
    render(<FootnoteLink value={val} subValue={subVal} />);
    expect(screen.getByText(val)).toBeInTheDocument();
    // expect(screen.getByText('fn5-3-rf')).toBeInTheDocument();
  });
  test('renders the basic FootnoteLink component with indicator', () => {
    render(<FootnoteLink value={val} indicator={ind} />);
    expect(screen.getByText(ind)).toBeInTheDocument();
  });

  test('renders the basic FootnoteSection component', () => {
    render(<FootnoteSection />);
  });
  test('renders the basic FootnoteSection.Footnote component', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val} />
      </FootnoteSection>
    );
    expect(screen.getByText(val)).toBeInTheDocument();
  });
  test('renders the FootnoteSection.Footnote component with children', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val}>
          {content}
        </FootnoteSection.Footnote>
        <FootnoteSection.Footnote />
      </FootnoteSection>
    );
    expect(screen.getByText(val)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
  it('test valid return link', () => {
    render(
      <span>
        <FootnoteLink value={val} />
        <FootnoteSection>
          <FootnoteSection.Footnote value={val}>hi</FootnoteSection.Footnote>
        </FootnoteSection>
      </span>
    );
    fireEvent.click(screen.getAllByText(val)[1]);
    expect(screen.getAllByText(val)[1].closest('a')).toHaveAttribute(
      'href',
      '#fn5-rf'
    );
  });
  it('test invalid return link', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val}>hi</FootnoteSection.Footnote>
      </FootnoteSection>
    );
    fireEvent.click(screen.getByText(val));
    expect(screen.getByText(val).closest('a')).toHaveAttribute(
      'href',
      '#fn5-1-rf'
    );
  });
  it('"test" null href (shouldn\'t ever happen, if it does then give error', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val}>hi</FootnoteSection.Footnote>
      </FootnoteSection>
    );
    const hold = screen.getByText(val).closest('a');
    if (hold) {
      hold.removeAttribute('href');
    }
    fireEvent.click(screen.getByText(val));
    expect(screen.getByText(val).closest('a')).not.toHaveAttribute('href');
  });
  it('test valid link', () => {
    render(
      <span>
        <FootnoteLink value={val} subValue={2} />
        <FootnoteSection>
          <FootnoteSection.Footnote value={val}>hi</FootnoteSection.Footnote>
        </FootnoteSection>
      </span>
    );
    fireEvent.click(screen.getAllByText(val)[0]);
    expect(screen.getAllByText(val)[1].closest('a')).toHaveAttribute(
      'href',
      '#fn5-2-rf'
    );
  });
  it('test invalid link', () => {
    render(
      <span>
        <FootnoteLink value={val} subValue={2} />
      </span>
    );
    fireEvent.click(screen.getAllByText(val)[0]);
  });
});
