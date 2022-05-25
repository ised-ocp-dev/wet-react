import React from 'react';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** TabListItem elements with titles of each panel */
  list?: React.ReactNode;
  /** TabPanelItem elements with contents of each tab */
  children?: React.ReactNode;
  /** resets tabs to default on reload */
  ignoreSession?: boolean;
}

const Tabs = ({ list, children, ignoreSession = false }: TabsProps) => {
  const ignoreSessionName = ignoreSession ? 'ignore-session' : '';
  return (
    <div
      className={`wb-tabs wb-init wb-tabs-inited tabs-acc ${ignoreSessionName}`}
    >
      {list === undefined ? '' : list}
      <div className="tabpanels">{children}</div>
    </div>
  );
};
export default Tabs;
