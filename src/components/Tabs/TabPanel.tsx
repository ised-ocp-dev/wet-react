import React from 'react';
import TabRB from 'react-bootstrap/Tab';

export interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** identification value for Tabs mainPanel property to link to. Must be unique within Tabs element */
  id?: string;
  /** **mandatory** title, displayed to user */
  title: string;
  /** Content of TabPanel body */
  children?: React.ReactNode;
}

const TabPanel = ({ children, id, title = '' }: TabPanelProps) => (
  <TabRB eventKey={id} title={title}>
    {children}
  </TabRB>
);

export default TabPanel;
