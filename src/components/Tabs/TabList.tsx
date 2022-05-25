import React from 'react';
import '../../style.css';

export interface TabListProps extends React.HTMLAttributes<HTMLElement> {
  /** TabListItem elements with contents of each tab */
  children?: React.ReactNode;
}

const TabList = ({ children }: TabListProps) => (
  <ul role="tablist" className="generated">
    {children}
  </ul>
);

export default TabList;
