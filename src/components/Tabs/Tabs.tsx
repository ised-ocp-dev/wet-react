import React from 'react';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of Tabs */
  children?: React.ReactNode;
}

const Tabs = ({ children }: TabsProps) => (
  <div className="wb-tabs">
    <div className="tabpanels">{children}</div>
  </div>
);

export default Tabs;
