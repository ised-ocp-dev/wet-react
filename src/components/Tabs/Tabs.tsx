import React, { useEffect } from 'react';
import TabContainerRB from 'react-bootstrap/TabContainer';
import TabContentRB from 'react-bootstrap/TabContent';
import TabPaneRB from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavItem from 'react-bootstrap/NavItem';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** id of tab to be initially open. Default is first tab */
  mainPanel?: string;
  /** unique identification value */
  id?: string;
  /** array of panels to be displayed, of the form <br />{ [ {title:"...", id:"...", content:<>...</>}, ... ] } */
  panels?: { title: string; id: string; content: React.ReactNode }[];
  /** disables unsupported warning */
  disableWarning?: boolean;
}

const Tabs = ({
  mainPanel,
  id = '',
  panels,
  disableWarning = false,
}: TabsProps) => {
  const [big, setBig] = React.useState(window.innerWidth > 991);
  const [openID, setOpenID] = React.useState(
    mainPanel === undefined
      ? panels === undefined
        ? 'null'
        : panels[0].id
      : mainPanel
  );
  function handleResize() {
    setBig(window.innerWidth > 991);
  }

  useEffect(() => {
    if (!disableWarning)
      // eslint-disable-next-line no-console
      console.warn(
        'Tabs is an unfinished and unsupported component. Please use with discretion.'
      );
  }, []);

  useEffect(() => {
    // removes event handlers before unmount
    handleResize();
    return () => {
      setOpenID('');
      setBig(false);
    };
  }, []);

  window.addEventListener('resize', handleResize);
  return panels && panels[0] ? (
    big ? (
      <div className="wb-tabs tabs-acc">
        <TabContainerRB id={id} defaultActiveKey={openID}>
          <Nav
            as="ul"
            bsPrefix="generated"
            role="tablist"
            onSelect={(e) => setOpenID(e)}
          >
            {panels.map((item) => (
              <NavItem
                as="li"
                className={item.id === openID ? 'active' : ''}
                key={item.id}
              >
                <NavLink eventKey={item.id} role="tab" tabIndex={0}>
                  {item.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContentRB bsPrefix="tabpanels">
            {panels.map((item) => (
              <TabPaneRB
                as="details"
                open={item.id === openID}
                eventKey={item.id}
                title={item.title}
                key={item.id}
              >
                <summary> </summary>
                {item.content}
              </TabPaneRB>
            ))}
          </TabContentRB>
        </TabContainerRB>
      </div>
    ) : (
      <div className="wb-tabs tabs-acc" role="tablist">
        <div className="tabpanels">
          {panels.map((item) => (
            <details
              open={item.id === openID}
              id={item.id}
              key={item.id}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) {
                  setOpenID((e.target as Element).id);
                }
              }}
            >
              <summary
                className="wb-toggle tgl-tab wb-init wb-toggle-inited"
                role="tab"
              >
                {item.title}
              </summary>
              <div className="tgl-panel" role="tabpanel">
                {item.content}
              </div>
            </details>
          ))}
        </div>
      </div>
    )
  ) : (
    <p> </p>
  );
};
export default Tabs;
