import React, { useEffect } from 'react';
import TabsRB from 'react-bootstrap/Tabs';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** id of tab to be initially open. Default is first tab */
  mainPanel?: string;
  /** unique identification value */
  id?: string;
  /** TabPanelItem elements with contents of each tab */
  children?: React.ReactNode;
}

const Tabs = ({ mainPanel = '', id = '', children }: TabsProps) => (
  <TabsRB className="mb-3" id={id} defaultActiveKey={mainPanel}>
    {children}
  </TabsRB>
);
export default Tabs;
