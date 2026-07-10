import "./StatCard.css";
 const StatCard = ({ label, value, icon, accent = "blue", loading = false }) => {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      {icon && <div className="stat-card-icon">{icon}</div>}
      <div className="stat-card-body">
        <span className="stat-card-value">{loading ? "—" : value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
};
 
export default StatCard;