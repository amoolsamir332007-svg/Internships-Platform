import "./StatusTabs.css";
 
const StatusTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="status-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`status-tabs-item ${activeTab === tab.value ? "status-tabs-item-active" : ""}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
 
export default StatusTabs;