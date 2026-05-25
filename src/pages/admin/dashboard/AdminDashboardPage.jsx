import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../api/admin";
import { Chart } from "react-apexcharts";

const AdminDashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await getDashboardStats();
      setDashboard(data);
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <div>
        <h2>Total Reservations</h2>
        <p>{dashboard.summary.totalReservations}</p>
      </div>

      <div>
        <h2>Active Reservations</h2>
        <p>{dashboard.summary.activeReservations}</p>
      </div>

      <div>
        <h2>Cancelled Reservations</h2>
        <p>{dashboard.summary.cancelledReservations}</p>
      </div>

      <div>
        <h2>Total Users</h2> <p>{dashboard.summary.totalUsers}</p>
      </div>

      <div>
        <h2>Total Locations</h2> <p>{dashboard.summary.totalLocations}</p>
      </div>

      <Chart
        type="bar"
        height={300}
        series={[
          {
            name: "Reservations By Month",
            data: dashboard.reservationsByMonth.map((item) => item.count),
          },
        ]}
        options={{
          xaxis: {
            categories: dashboard.reservationsByMonth.map((item) => item.month),
          },
        }}
      />

      <Chart
        type="pie"
        height={300}
        series={dashboard.reservationsByLocation.map((item) => item.count)}
        options={{
          labels: dashboard.reservationsByLocation.map((item) => item.name),
        }}
      />

      <Chart
        type="donut"
        height={300}
        series={dashboard.reservationsByStatus.map((item) => item.count)}
        options={{
          labels: dashboard.reservationsByStatus.map((item) => item.status),
        }}
      />
    </div>
  );
};

export default AdminDashboardPage;
