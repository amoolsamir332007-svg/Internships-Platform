import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import "./DashboardCharts.css";


const applicationData = [
  { month: "Jan", value: 4 },
  { month: "Feb", value: 7 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 9 },
  { month: "May", value: 15 },
  { month: "Jun", value: 20 },
];


const internshipData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 7 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 9 },
  { month: "May", value: 15 },
  { month: "Jun", value: 20 },
];

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">

      <h3>{title}</h3>

      <div className="chart-container">
        {children}
      </div>

    </div>
  );
}

export default function DashboardCharts() {

  return (

    <div className="charts-wrapper">


      {/* Application Growth */}
      <ChartCard title="Application Growth">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={applicationData}>
            <defs>

              <linearGradient
                id="purpleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
            />

            <XAxis
              dataKey="month"
              tick={{fontSize:12}}
            />

            <YAxis
              domain={[0,20]}
              ticks={[0,5,10,15,20]}
              tick={{fontSize:12}}
            />

            <Tooltip />


            <Area
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              strokeWidth={3}
              fill="url(#purpleGradient)"
            />

          </AreaChart>


        </ResponsiveContainer>


      </ChartCard>

      {/* Internship Activity */}

      <ChartCard title="Internship Activity">


        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={internshipData}>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="month"
              tick={{fontSize:12}}
            />


            <YAxis
              domain={[0,20]}
              ticks={[0,5,10,15,20]}
              tick={{fontSize:12}}
            />

            <Tooltip />

            <Line

              type="monotone"

              dataKey="value"

              stroke="#8b5cf6"

              strokeWidth={3}

              dot={{
                r:5,
                stroke:"#8b5cf6",
                strokeWidth:3,
                fill:"#fff"
              }}

              activeDot={{
                r:7
              }}

            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>


    </div>

  );
}