import React from 'react';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** **REQUIRED** unique identification value **REQUIRED** */
  id: string;
  /** TabPanelItem elements with contents of each tab */
  children?: React.ReactNode;
  /** resets tabs to default on reload */
  ignoreSession?: boolean;
}

function cycleTabs(e: Element, hop: number) {
  const tabs = e.closest('.wb-tabs');
  if (tabs === null) {
    return;
  }
  const tabPanels = tabs.getElementsByClassName('.wb-tab-panel');
  let index = 0;
  for (let i = 0; i < tabPanels.length; i += 1) {
    if ((tabPanels[i] as Element).getAttribute('open')) {
      index = i;
      break;
    }
  }
  const newIndex =
    (index + hop) % tabPanels.length >= 0
      ? (index + hop) % tabPanels.length
      : tabPanels.length - 1;
  // set values
}

function initTabs(e: Element) {
  let activeIndex = 0;
  const tabs = e.closest('.wb-tabs');
  if (tabs === null || tabs.classList.contains('wb-tabs-inited')) {
    return;
  }
  const tabPanels = tabs.getElementsByClassName('.wb-tab-panel');
  for (let i = 0; i < tabPanels.length; i += 1) {
    // find which panel is open
    const panel = tabPanels[i];
    if (panel.getAttribute('open')) {
      activeIndex = i;
      break;
    }
  }
  for (let i = 0; i < tabPanels.length; i += 1) {
    // close all other panels, generate tab panel list
    const panel = tabPanels[i];
    if (i !== activeIndex) {
      panel.removeAttribute('open');
    }
    const id = panel.getAttribute('id');
    if (id) {
      const hrefName = id[0] === '#' ? id : `#${id}`;
      const newItem = document.createElement('li');
      newItem.classList.add(i === activeIndex ? 'active' : '');
      const newItem2 = document.createElement('a');
      newItem2.setAttribute('href', hrefName);
      newItem2.innerHTML = (panel.childNodes[0] as Element).innerHTML;
      newItem.append(newItem2);
      tabs.childNodes[0].appendChild(newItem);
    }
  }
  tabs.classList.add('wb-tabs-inited');
}

const Tabs = ({ id, children, ignoreSession = false }: TabsProps) => {
  const ignoreSessionName = ignoreSession ? 'ignore-session' : '';
  return (
    <div className={`wb-tabs wb-init tabs-acc ${ignoreSessionName}`} id={id}>
      <ul role="tablist" className="generated" />
      <div className="tabpanels">{children}</div>
    </div>
  );
};
export default Tabs;
