import React from 'react';

export interface TabsItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Content of TabsItem body */
  children?: React.ReactNode;
  /** identification value */
  id?: string;
  /** summary for user */
  summary?: string;
  /** indicates that this tab should be open by default */
  open?: boolean;
}

const TabsItem = ({
  children,
  id = '',
  summary = '',
  open = false,
}: TabsItemProps) => (
  <details id={id} open={open}>
    <summary>{summary}</summary>
    {children}
  </details>
);

export default TabsItem;
