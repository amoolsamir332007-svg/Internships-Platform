import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./DashboardCharts.css";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Groups a list of items by month (based on a date field) and returns
// cumulative counts across the last 6 months — real data derived from
// whatever the API actually returned, no invented numbers.
const buildMonthlySeries = (items, dateField) => {
  const now = new Date();
  const buckets = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, name: MONTH_LABELS[d.getMonth()], count: 0 });
  }

  (items || []).forEach((item) => {
    const raw = item[dateField];
    if (!raw) return;
    const d = new Date(raw);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  });

  let running = 0;
  return buckets.map((b) => {
    running += b.count;
    return { name: b.name, value: running };
  });
};

export const DashboardCharts = ({ applications, internships }) => {
  const applicationData = buildMonthlySeries(applications, "createdAt");
  const internshipData = buildMonthlySeries(internships, "startDate");

  return (
    <div className="dashboard-charts-grid">
      <div className="dashboard-chart-card">
        <h3>Application Growth</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={applicationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eefc" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8b869e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#8b869e" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#5b3df0" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-chart-card">
        <h3>Internship Activity</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={internshipData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eefc" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8b869e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#8b869e" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#7c5cff" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;