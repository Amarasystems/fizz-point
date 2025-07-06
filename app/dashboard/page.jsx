"use client";
import { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/protected/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="flex h-[100vh] bg-black justify-center items-center">
        <div className="text-[red]">Error: {error}</div>
      </div>
    );

  return (
    <div>
      <AdminNavbar />
    </div>
  );
};

export default Dashboard;
