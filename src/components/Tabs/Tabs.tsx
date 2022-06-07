import React from 'react';
import TabsRB from 'react-bootstrap/Tabs';
import TabRB from 'react-bootstrap/Tab';
import TabContainerRB from 'react-bootstrap/TabContainer';
import TabContentRB from 'react-bootstrap/TabContent';
import TabPaneRB from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavItem from 'react-bootstrap/NavItem';
import Accordion from 'react-bootstrap/Accordion';
import '../../style.css';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  /** id of tab to be initially open. Default is first tab */
  mainPanel?: string;
  /** unique identification value */
  id?: string;
  /** array of panels to be displayed, of the form {[{title:"...", id:"...", content:<>...</>},...]} */
  panels?: [{ title: string; id: string; content: React.ReactNode }];
}

const Tabs = ({ mainPanel = '', id = '', panels }: TabsProps) => {
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
  window.addEventListener('resize', handleResize);
  return panels && panels[0] ? (
    big ? (
      <span>
        <div className="wb-tabs tabs-acc">
          <TabsRB id={id} defaultActiveKey={mainPanel || panels[0].id}>
            {panels.map((item) => (
              <TabRB eventKey={item.id} title={item.title} key={item.id}>
                {item.content}
              </TabRB>
            ))}
          </TabsRB>
        </div>
        <div className="wb-tabs tabs-acc">
          <TabContainerRB id={id} defaultActiveKey={mainPanel || panels[0].id}>
            <Nav
              as="ul"
              role="tablist"
              onSelect={(sk) => {
                setOpenID(sk);
              }}
            >
              {panels.map((item) => (
                <NavItem as="li" className={item.id === openID ? 'active' : ''}>
                  <NavLink eventKey={item.id} key={item.id}>
                    {item.title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContentRB>
              {panels.map((item) => (
                <TabPaneRB eventKey={item.id} title={item.title} key={item.id}>
                  {item.content}
                </TabPaneRB>
              ))}
            </TabContentRB>
          </TabContainerRB>
        </div>
      </span>
    ) : (
      <span>
        <div className="wb-tabs tabs-acc">
          <Accordion
            defaultActiveKey={mainPanel || panels[0].id}
            bsPrefix="tabpanels"
            flush
          >
            {panels.map((item) => (
              <Accordion.Item eventKey={item.id} as="details" key={item.id}>
                <Accordion.Header as="summary">{item.title}</Accordion.Header>
                <Accordion.Body bsPrefix="tgl-panel" role="tabpanel">
                  {item.content}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
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
      </span>
    )
  ) : (
    <p> </p>
  );
};
export default Tabs;

/*
<div class="wb-tabs wb-init wb-tabs-inited tabs-acc" id="wb-auto-2"><ul aria-hidden="false" class="" aria-live="off" role="tablist">
<li class="" role="presentation">
<a id="details-panel1-lnk" href="#details-panel1" tabindex="-1" role="tab" aria-selected="false" aria-controls="details-panel1">
Example 1</a></li>
<li role="presentation" class="active">
<a id="details-panel2-lnk" href="#details-panel2" tabindex="0" role="tab" aria-selected="true" aria-controls="details-panel2">Example 2</a></li>
<li role="presentation" class=""><a id="details-panel3-lnk" href="#details-panel3" tabindex="-1" role="tab" aria-selected="false" aria-controls="details-panel3">Example 3</a></li></ul>
<div class="tabpanels">
<details id="details-panel1" class="wb-auto-2-grp off fade out noheight" aria-labelledby="details-panel1-lnk" role="tabpanel" open="open" aria-hidden="true" aria-expanded="false">
<summary class="wb-toggle tgl-tab wb-init wb-toggle-inited" data-toggle="{&quot;parent&quot;: &quot;#wb-auto-2&quot;, &quot;group&quot;: &quot;.wb-auto-2-grp&quot;}" aria-hidden="true" id="wb-auto-3" role="tab" aria-selected="false" tabindex="0" aria-posinset="1" aria-setsize="3" aria-expanded="false">Example 1</summary><div class="tgl-panel" aria-labelledby="wb-auto-3" aria-hidden="true" aria-expanded="false">
<p></p>
</div></details>
<details id="details-panel2" class="wb-auto-2-grp on fade in" aria-labelledby="details-panel2-lnk" open="open" role="tabpanel" aria-hidden="false" aria-expanded="true">
<summary class="wb-toggle tgl-tab wb-init wb-toggle-inited" data-toggle="{&quot;parent&quot;: &quot;#wb-auto-2&quot;, &quot;group&quot;: &quot;.wb-auto-2-grp&quot;}" aria-hidden="true" id="wb-auto-4" role="tab" aria-selected="false" tabindex="0" aria-posinset="2" aria-setsize="3" aria-expanded="false">Example 2</summary><div class="tgl-panel" aria-labelledby="wb-auto-4" aria-hidden="false" aria-expanded="true">
<p></p>
</div></details>
</div></div>
*/
