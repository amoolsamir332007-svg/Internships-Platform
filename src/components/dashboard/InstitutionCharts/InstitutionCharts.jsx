    import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    } from "recharts";

    import "./InstitutionCharts.css";


    const applicationData = [
    {
        month: "Jan",
        applications: 20,
    },
    {
        month: "Feb",
        applications: 35,
    },
    {
        month: "Mar",
        applications: 50,
    },
    {
        month: "Apr",
        applications: 75,
    },
    {
        month: "May",
        applications: 90,
    },
    ];


    const statusData = [
    {
        name: "Pending",
        value: 40,
    },
    {
        name: "Accepted",
        value: 45,
    },
    {
        name: "Rejected",
        value: 15,
    },
    ];


    const InstitutionCharts = () => {

    return (

        <div className="institution-charts">


        <div className="institution-chart-card">

            <h3>
            Applications Overview
            </h3>


            <ResponsiveContainer width="100%" height={300}>

            <LineChart data={applicationData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />


                <Line
                type="monotone"
                dataKey="applications"
                stroke="#4338ca"
                strokeWidth={4}
                dot={{
                    r:6
                }}
                />

            </LineChart>

            </ResponsiveContainer>


        </div>




        <div className="institution-chart-card">

            <h3>
            Application Status
            </h3>


            <ResponsiveContainer width="100%" height={300}>


            <PieChart>

                <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                >

                {
                    statusData.map((entry,index)=>(
                    <Cell
                        key={index}
                        fill={
                        [
                            "#f59e0b",
                            "#22c55e",
                            "#ef4444"
                        ][index]
                        }
                    />
                    ))
                }

                </Pie>


                <Legend />

                <Tooltip />


            </PieChart>


            </ResponsiveContainer>


        </div>


        </div>

    );
    };


    export default InstitutionCharts;