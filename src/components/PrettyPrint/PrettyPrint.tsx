import React from 'react';
import '../../style.css';

type tagTypeType = 'code' | 'pre' | undefined;

export interface PrettyPrintProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content of PrettyPrint */
  children?: React.ReactNode;
  /** loads the PrettyPrint component, ignores other arguments. Do once per page */
  initialize?: boolean;
  /** applies to all pre and code elements */
  wholePage?: boolean;
  /** applies syntax highlighting */
  highlight?: boolean;
  /** if not wholePage, choose tag type of `pre` or `code` */
  tagType?: tagTypeType;
  /** adds line numbers for all lines or all lines after given number */
  lineNums?: boolean | number;
  /** adds language support for given language */
  language?: string;
}

const PrettyPrint = ({
  children,
  initialize = false,
  wholePage = false,
  highlight = false,
  tagType = 'pre',
  lineNums = false,
  language,
}: PrettyPrintProps) => {
  const lineNumsName = lineNums
    ? typeof lineNums === 'boolean'
      ? 'linenums'
      : `linenums:${lineNums} linenums`
    : '';
  const highlightName = wholePage && highlight ? 'all-pre' : '';
  const languageName = language ? `lang-${language}` : '';

  return initialize ? (
    <span className="wb-prettify">{children}</span>
  ) : wholePage ? (
    <span
      className={`wb-prettify ${highlightName} ${lineNumsName} ${languageName}`}
    >
      {children}
    </span>
  ) : tagType === 'code' ? (
    <code
      className={`prettyprint ${highlightName} ${lineNumsName} ${languageName}`}
    >
      {children}
    </code>
  ) : (
    <pre
      className={`prettyprint ${highlightName} ${lineNumsName} ${languageName}`}
    >
      {children}
    </pre>
  );
};

export default PrettyPrint;
