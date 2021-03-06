import React from 'react';

export interface AlertLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Content of alert Link */
  children?: React.ReactNode;
  /** The target of hyperlink */
  href: string;
  /** Additional custom classNames */
  className?: string;
}

const AlertLink = ({ children, className = '', ...rest }: AlertLinkProps) => (
  <a className={`alert-link ${className}`} {...rest}>
    {children}
  </a>
);

export default AlertLink;
