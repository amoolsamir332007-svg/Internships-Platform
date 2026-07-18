import "./StatCard.css";

const StatCard = ({ icon, value, label, accent = "purple" }) => {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      <div className="stat-card-icon">{icon}</div>
      <div>
        <p className="stat-card-value">{value}</p>
        <p className="stat-card-label">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;