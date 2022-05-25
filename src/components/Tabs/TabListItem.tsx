import React from 'react';

export interface TabListItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of TabsItem body */
  children?: React.ReactNode;
  /** sets this tab to be open when page is loaded */
  active?: boolean;
  /** id of panel this item points to */
  href?: string;
}

const TabListItem = ({
  children,
  active = false,
  href = '#',
}: TabListItemProps) => {
  const activeName = active ? 'active' : '';
  const hrefName = href[0] === '#' ? href : `#${href}`;
  return (
    <li className={activeName}>
      <a href={hrefName}>{children}</a>
    </li>
  );
};

export default TabListItem;
