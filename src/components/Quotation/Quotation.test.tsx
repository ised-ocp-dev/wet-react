import React from 'react';
import { render, screen } from '@testing-library/react';

import Quotation from '@components/Quotation';

describe('Quotation', () => {
  const QuotationContent = 'Quote this';
  const QuotationFooter = 'Foot';
  const QuotationCite = 'Cit';

  describe('Test Quotation with/without sources', () => {
    test('renders the basic Quotation component', () => {
      render(<Quotation>{QuotationContent}</Quotation>);
      expect(screen.getByText(QuotationContent)).toBeInTheDocument();
    });
    test('renders the Quotation component with footer', () => {
      render(
        <Quotation footer={QuotationFooter}>{QuotationContent}</Quotation>
      );
      expect(screen.getByText(QuotationContent)).toBeInTheDocument();
    });
    test('renders the Quotation component with citation', () => {
      render(<Quotation cite={QuotationCite}>{QuotationContent}</Quotation>);
      expect(screen.getByText(QuotationContent)).toBeInTheDocument();
      expect(screen.getByText(QuotationCite)).toBeInTheDocument();
    });
    test('renders the Quotation component with footer and citation', () => {
      render(
        <Quotation footer={QuotationFooter} cite={QuotationCite}>
          {QuotationContent}
        </Quotation>
      );
      expect(screen.getByText(QuotationContent)).toBeInTheDocument();
      expect(screen.getByText(QuotationCite)).toBeInTheDocument();
    });
  });
  describe('Test justification', () => {
    test('source justified', () => {
      render(
        <Quotation reverseSource footer={QuotationFooter} cite={QuotationCite}>
          {QuotationContent}
        </Quotation>
      );
      expect(screen.getByText(QuotationCite).parentNode).toHaveClass(
        'text-right'
      );
    });
    test('block quote justified', () => {
      render(
        <Quotation reverseQuote footer={QuotationFooter} cite={QuotationCite}>
          {QuotationContent}
        </Quotation>
      );
      expect(screen.getByText(QuotationContent).parentNode).toHaveClass(
        'blockquote-reverse'
      );
    });
    test('empty quote', () => {
      render(<Quotation />);
    });
  });
});
