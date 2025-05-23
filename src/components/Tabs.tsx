import { useState } from "react";
import { Tab } from "../features/Words/models";

interface TabsProps {
  tabs: Tab[];
  defaultTab: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activeTabFormat = "bg-lincolngreendarker border-b-lincolngreendarker";
  const nonActiveTabFormat = "bg-lincolngreen hover:bg-lincolngreendarker";

  return (
    <>
      <div>
        {tabs.map((tab) => (
          <button
            className={`-mb-px px-${tab.length} rounded-t-xl border border-black ${tab.key === activeTab ? activeTabFormat : nonActiveTabFormat}`}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-lincolngreendarker rounded-e-3xl rounded-b-3xl border border-l-black border-r-black border-b-black border-t-black">
        {tabs.find((t) => t.key === activeTab)?.content}
      </div>
    </>
  );
}
