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
  const footnoteId = `fn${{ value }}-rf`;
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
Footnote.displayName = 'Footnote';

export default Footnote;

/*

<Canvas>
  <span>
    <FootnoteLink value="1" subValue="1" />
    <FootnoteLink value="1" subValue="2" />
    <aside class="wb-fnote" role="note">
      <h2 id="fn">Footnotes</h2>
      <dl>
        <FootnoteSection.Footnote
          children="This is a foot"
          value="1"
          disableDefaultPoint
        />
      </dl>
    </aside>
  </span>
</Canvas>

*/
