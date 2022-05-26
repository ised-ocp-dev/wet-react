import React from 'react';
import '../../../style.css';

export interface FootnoteProps extends React.HTMLAttributes<HTMLElement> {
  /** What footnote it links to */
  value?: string;
  /** The content of the Footer */
  children?: React.ReactNode;
}

const Footnote = ({ value = '', children }: FootnoteProps) => (
  <span>
    <dt>Footnote {value}</dt>
    <dd id={`fn${value}`}>
      {children}
      <p className="fn-rtn">
        <a
          href={`#fn${value}-rf`}
          onClick={(e) => {
            const temp = e.currentTarget.getAttribute('href');
            if (temp) {
              if (document.getElementById(temp.substring(1)) === null) {
                e.currentTarget.setAttribute('href', `#fn${value}-1-rf`);
              }
            }
          }}
        >
          <span className="wb-inv">
            Return to <span>first</span> footnote
          </span>
          {value}
          <span className="wb-inv"> referrer</span>
        </a>
      </p>
    </dd>
  </span>
);

export default Footnote;
