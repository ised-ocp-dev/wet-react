import React from 'react';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** **REQUIRED** unique identification value */
  id: string;
  /** resets tabs to default on reload */
  ignoreSession?: boolean;
  /** TabPanelItem elements with contents of each tab */
  children?: React.ReactNode;
}

function closeAllTabs(tabs: Element) {
  const tabPanels = tabs.getElementsByClassName('wb-tab-panel');
  for (let i = 0; i < tabPanels.length; i += 1) {
    (tabs.childNodes[0].childNodes[i] as Element).classList.remove('active');
    (tabs.childNodes[0].childNodes[i] as Element).setAttribute(
      'tabIndex',
      '-1'
    );
    (tabs.childNodes[0].childNodes[i] as Element).setAttribute(
      'aria-selected',
      'false'
    );
    if (tabPanels[i].classList.contains('in')) {
      tabPanels[i].classList.remove('in');
    }
    if (window.innerWidth >= 992) {
      tabPanels[i].classList.add('out');
    }
    tabPanels[i].classList.add('noheight');
    tabPanels[i].removeAttribute('open');
    tabPanels[i].setAttribute('aria-expanded', 'false');
    tabPanels[i].setAttribute('aria-hidden', 'true');

    (tabPanels[i].childNodes[1] as Element).setAttribute(
      'aria-expanded',
      'false'
    );
    (tabPanels[i].childNodes[1] as Element).setAttribute('aria-hidden', 'true');
  }
}

function openTab(tabs: Element, location: number | string) {
  closeAllTabs(tabs);
  let listTarget;
  let panelTarget;
  if (typeof location === 'number') {
    listTarget = tabs.childNodes[0].childNodes[location] as Element;
    panelTarget = tabs.getElementsByClassName('wb-tab-panel')[location];
  } else {
    for (let i = 0; i < tabs.childNodes[0].childNodes.length; i += 1) {
      if (
        (tabs.childNodes[0].childNodes[i].childNodes[0] as Element)
          .getAttribute('href')
          ?.substring(1) === location
      ) {
        listTarget = tabs.childNodes[0].childNodes[i] as Element;
        break;
      }
    }
    panelTarget = document.getElementById(location);
  }
  if (listTarget === null || listTarget === undefined || panelTarget === null) {
    return;
  }
  listTarget.classList.add('active');
  (listTarget.childNodes[0] as Element).setAttribute('tabIndex', '0');
  (listTarget.childNodes[0] as Element).setAttribute('aria-selected', 'true');
  panelTarget.classList.add('in');
  panelTarget.classList.remove('out');
  panelTarget.classList.remove('noheight');
  panelTarget.setAttribute('open', 'open');
  panelTarget.setAttribute('aria-expanded', 'true');
  panelTarget.setAttribute('aria-hidden', 'false');
  (panelTarget.childNodes[1] as Element).setAttribute('aria-expanded', 'true');
  (panelTarget.childNodes[1] as Element).setAttribute('aria-hidden', 'false');
}

function handleResize(id: string) {
  const tabPanels = document
    .getElementById(id)
    ?.getElementsByClassName('wb-tab-panel');
  if (tabPanels) {
    if (window.innerWidth < 992) {
      for (let i = 0; i < tabPanels.length; i += 1) {
        tabPanels[i].classList.remove('fade');
        tabPanels[i].classList.remove('out');
      }
    } else {
      for (let i = 0; i < tabPanels.length; i += 1) {
        if (!tabPanels[i].classList.contains('fade')) {
          tabPanels[i].classList.add('fade');
        }
        if (!tabPanels[i].classList.contains('in')) {
          tabPanels[i].classList.add('out');
        }
      }
    }
  }
}

function initTabs(id: string) {
  let activeIndex = 0;
  const tabs = document.getElementById(id);
  if (tabs === null || tabs.classList.contains('wb-tabs-inited')) {
    return;
  }
  const tabPanels = tabs.getElementsByClassName('wb-tab-panel');
  for (let i = 0; i < tabPanels.length; i += 1) {
    const panel = tabPanels[i];
    const panelID = panel.getAttribute('id');
    if (panelID) {
      panel.addEventListener('click', (e) => {
        e.preventDefault();
        if (
          panel.hasAttribute('open') &&
          window.innerWidth < 992 &&
          (e.target as Element).tagName === 'SUMMARY'
        ) {
          closeAllTabs(tabs);
        } else {
          openTab(tabs, panelID);
        }
      });
      const hrefName = panelID[0] === '#' ? panelID : `#${panelID}`;
      const newItem = document.createElement('li');
      newItem.setAttribute('role', 'presentation');
      const newItem2 = document.createElement('a');
      newItem2.setAttribute('href', hrefName);
      newItem2.setAttribute('role', 'tab');
      newItem2.innerHTML = (panel.childNodes[0] as Element).innerHTML;
      newItem2.addEventListener('click', (e) => {
        e.preventDefault();
        openTab(tabs, panelID);
      });
      newItem.append(newItem2);
      tabs.childNodes[0].appendChild(newItem);
    }
  }
  for (let i = 0; i < tabPanels.length; i += 1) {
    if (tabPanels[i].hasAttribute('open')) {
      activeIndex = i;
      break;
    }
  }
  openTab(tabs, activeIndex);
  tabs.classList.add('wb-tabs-inited');
}

const Tabs = ({ id, children, ignoreSession = false }: TabsProps) => {
  window.addEventListener('load', () => initTabs(id));
  window.addEventListener('resize', () => handleResize(id));
  return (
    <div
      className={`wb-tabs wb-init tabs-acc ${
        ignoreSession ? 'ignore-session' : ''
      }`}
      id={id}
    >
      <ul role="tablist" className="generated" />
      <div className="tabpanels">{children}</div>
    </div>
  );
};
export default Tabs;
