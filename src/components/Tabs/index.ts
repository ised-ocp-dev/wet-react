import OriginTabs from './Tabs';
import TabListItem from './TabListItem';
import TabPanelItem from './TabPanelItem';
import TabList from './TabList';

export type TabsProps = typeof OriginTabs & {
  ListItem: typeof TabListItem;
  PanelItem: typeof TabPanelItem;
  List: typeof TabList;
};

const Tabs = OriginTabs as TabsProps;

Tabs.ListItem = TabListItem;
Tabs.PanelItem = TabPanelItem;
Tabs.List = TabList;

export default Tabs;
