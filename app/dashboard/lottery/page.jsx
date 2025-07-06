"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "@/app/components/admin/AdminNavbar";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const [lotteryCount, setLotteryCount] = useState(0);

  const lottery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/lottery/registered?pageSize=10`
      );
      const lotteryData = response.data.response;
      setLotteryCount(lotteryData.totalCount + 5000);
      setData(lotteryData.data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    lottery();
  }, []);

  return (
    <div className="max-w-[1440px] m-auto">
      <AdminNavbar />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="px-10">
        <p className="text-white text-center text-[32px] m-[70px]">
          Total Lottery Count: {lotteryCount}
        </p>
        <p className="text-white text-[24px] mb-4">Lasest lottery</p>
        {Array.isArray(data) && data.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {data.map((user) => (
              <div key={user.id} className="bg-gray-200 p-2 rounded-lg">
                <p>User ID: {user.id}</p>
                <p>Code: {user.code}</p>
                <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No users found</p>
        )}
      </div>
    </div>
  );
}
