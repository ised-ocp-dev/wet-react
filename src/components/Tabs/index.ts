import OriginTabs from './Tabs';
import TabsItem from './TabsItem';

export type TabsProps = typeof OriginTabs & {
  Item: typeof TabsItem;
};

const Tabs = OriginTabs as TabsProps;

Tabs.Item = TabsItem;

export default Tabs;
