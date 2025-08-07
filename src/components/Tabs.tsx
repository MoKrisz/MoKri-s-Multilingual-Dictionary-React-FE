import { useState } from "react";
import { Tab } from "../features/Words/models";

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0].key);

  const activeTabFormat =
    "bg-background-secondary border-b-background-secondary";
  const nonActiveTabFormat =
    "bg-background-quaternary hover:bg-background-secondary";

  return (
    <>
      <div>
        {tabs.map((tab) => (
          <button
            className={`-mb-px px-5 rounded-t-xl border border-black transition-all duration-200 ${
              tab.key === activeTab ? activeTabFormat : nonActiveTabFormat
            }`}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-background-secondary rounded-e-3xl rounded-b-3xl border border-l-black border-r-black border-b-black border-t-black">
        {tabs.find((t) => t.key === activeTab)?.content}
      </div>
    </>
  );
};

export default Tabs;
