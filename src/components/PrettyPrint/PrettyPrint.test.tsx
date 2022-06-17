import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PrettyPrint from '@components/PrettyPrint';

describe('PrettyPrint Tests', () => {
  const content = 'Hello world!';
  describe('Test general PrettyPrint component', () => {
    test('Test PrettyPrint basic', () => {
      render(<PrettyPrint>{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
    });
    test('Test PrettyPrint linenums', () => {
      render(<PrettyPrint lineNums>{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
      expect(screen.getByText(content)).toHaveClass('linenums');
    });
    test('Test PrettyPrint custon linenums', () => {
      render(<PrettyPrint lineNums={3}>{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
      expect(screen.getByText(content)).toHaveClass('linenums');
      expect(screen.getByText(content)).toHaveClass('linenums:3');
    });
    test('Test PrettyPrint pre', () => {
      render(<PrettyPrint tagType="pre">{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
    });
    test('Test PrettyPrint code', () => {
      render(<PrettyPrint tagType="code">{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
    });
    test('Test PrettyPrint language', () => {
      render(<PrettyPrint language="css">{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('prettyprint');
      expect(screen.getByText(content)).toHaveClass('lang-css');
    });
  });

  describe('Test test global PrettyPrint component', () => {
    test('Test global PrettyPrint component', () => {
      render(<PrettyPrint wholePage>{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('wb-prettify');
    });
    test('Test global PrettyPrint highlight component', () => {
      render(
        <PrettyPrint wholePage highlight>
          {content}
        </PrettyPrint>
      );
      expect(screen.getByText(content)).toHaveClass('wb-prettify');
      expect(screen.getByText(content)).toHaveClass('all-pre');
    });
    test('Test global PrettyPrint linenums component', () => {
      render(
        <PrettyPrint wholePage lineNums>
          {content}
        </PrettyPrint>
      );
      expect(screen.getByText(content)).toHaveClass('wb-prettify');
      expect(screen.getByText(content)).toHaveClass('linenums');
    });
    test('Test global PrettyPrint language component', () => {
      render(
        <PrettyPrint wholePage language="css">
          {content}
        </PrettyPrint>
      );
      expect(screen.getByText(content)).toHaveClass('wb-prettify');
      expect(screen.getByText(content)).toHaveClass('lang-css');
    });
    test('Test global PrettyPrint initializer component', () => {
      render(<PrettyPrint initialize>{content}</PrettyPrint>);
      expect(screen.getByText(content)).toHaveClass('wb-prettify');
    });
  });
});
