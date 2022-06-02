import React from 'react';
import TabRB from 'react-bootstrap/Tab';

export interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** **REQUIRED** unique identification value */
  id: string;
  /** title, displayed to user */
  title?: string;
  /** indicates that this tab should be the one that is open by default */
  open?: boolean;
  /** Content of TabPanel body */
  children?: React.ReactNode;
}

const TabPanel = ({
  children,
  id,
  title = '',
  open = false,
}: TabPanelProps) => (
  <details id={id} open={open} className="wb-tab-panel">
    <summary>{title}</summary>
    <div className="tgl-panel" role="tabpanel">
      {children}
    </div>
  </details>
);

export default TabPanel;
