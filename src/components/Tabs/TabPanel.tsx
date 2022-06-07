import React from 'react';
import TabRB from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';

export interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** **mandatory** identification value for Tabs mainPanel property to link to. Must be unique within Tabs element */
  id: string;
  /** **mandatory** title, displayed to user */
  title: string;
  /** Content of TabPanel body */
  children?: React.ReactNode;
}

const TabPanel = ({ children, id, title = '' }: TabPanelProps) => {
  const [big, setBig] = React.useState(window.innerWidth > 991);
  window.addEventListener('resize', () => setBig(window.innerWidth > 991));
  return big ? (
    <TabRB eventKey={id} title={title}>
      {children}
    </TabRB>
  ) : (
    <Accordion.Item eventKey={id} bsPrefix="tabpanels">
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

export default TabPanel;
