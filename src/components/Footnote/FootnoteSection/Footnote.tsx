import React from 'react';
import '../../../style.css';

export interface FootnoteProps extends React.HTMLAttributes<HTMLElement> {
  /** The content of the Footer */
  children?: React.ReactNode;
  /** What footnote it links to */
  value?: string;
  /** Optional: disable the qc that ensures the footnote points to the first instance where the footnote is refered in the content */
  disableDefaultPoint?: boolean;
}

const Footnote = ({
  value = '',
  disableDefaultPoint = false,
  children,
}: FootnoteProps) => {
  const footnoteId = `fn${value}-rf`;
  return disableDefaultPoint ? (
    <span>
      <dt>Footnote {value}</dt>
      <dd id={footnoteId}>
        {children}
        <p className="fn-rtn">
          <a href={footnoteId}>
            <span className="wb-inv">Return to footnote </span>
            {value}
            <span className="wb-inv"> referrer</span>
          </a>
        </p>
      </dd>
    </span>
  ) : (
    <span>
      <dt>Footnote {value}</dt>
      <dd id={footnoteId}>
        {children}
        <p className="fn-rtn">
          <a href={footnoteId}>
            <span className="wb-inv">
              Return to <span>first</span> footnote{' '}
            </span>
            {value}
            <span className="wb-inv"> referrer</span>
          </a>
        </p>
      </dd>
    </span>
  );
};

export default Footnote;
