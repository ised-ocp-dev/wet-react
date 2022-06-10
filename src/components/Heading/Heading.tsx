import React from 'react';
import '../../style.css';

type headingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined;

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  /** size of heading, default is h1 */
  level?: headingType;
  /** Contents of Heading */
  children?: React.ReactNode;
  /** heading text */
  text?: string;
  /** Use to create lighter, secondary text in any heading */
  secondaryText?: string;
  /** Use to add an underline to a heading */
  underline?: boolean;
}

const Heading = ({
  level = 'h1',
  secondaryText = '',
  underline = false,
  text = '',
}: HeadingProps) => {
  const underlineString = underline ? 'page-header' : '';
  const Tag = level;
  return secondaryText === '' ? (
    <Tag className={underlineString}>{text}</Tag>
  ) : (
    <Tag className={underlineString}>
      {text}
      {' – '}
      <span className="small">{secondaryText}</span>
    </Tag>
  );
};

export default Heading;
