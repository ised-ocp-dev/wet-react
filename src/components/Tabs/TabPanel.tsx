import React from 'react';

export interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of TabPanel body */
  children?: React.ReactNode;
  /** **REQUIRED** unique identification value **REQUIRED** */
  id: string;
  /** title, displayed to user */
  title?: string;
  /** indicates that this tab should be the one that is open by default */
  open?: boolean;
}

const TabPanel = ({
  children,
  id,
  title = '',
  open = false,
}: TabPanelProps) => (
  <details id={id} open={open} className="wb-tab-panel">
    <summary>{title}</summary>
    {children}
  </details>
);

export default TabPanel;
